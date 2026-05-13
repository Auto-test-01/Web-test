import { expect } from "@playwright/test";
import { test } from "../pages/base";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test("LoginPage test: ใส่ค่า username และ password ", async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword("standard_user", "secret_sauce");

  expect(await loginPage.getUsername()).toBe("standard_user");
  expect(await loginPage.getPassword()).toBe("secret_sauce");
});
test("LoginPage test: ใส่ค่า username และ password ผิด แล้วกด login", async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword("wrong_user", "wrong_password");
  await loginPage.clickLoginButton();
  
  expect((await loginPage.checkResponse()).success).toBe(false);
  expect((await loginPage.checkResponse()).message).toBe("[W1]")
});
// test("LoginPage test: ใส่ค่า username ที่มีในระบบ และ password ผิด แล้วกด login", async ({ loginPage }) => {
//   await loginPage.fillUserNameAndPassword("wongsaphat", "wrong_password");
//   await loginPage.clickLoginButton();
  
//   expect((await loginPage.checkResponse()).success).toBe(false);
//   expect((await loginPage.checkResponse()).message).toBe("[W3]")
// });
test.only("LoginPage test: ใส่ค่า username ที่มีในระบบ และ password ถูกต้อง แล้วกด login", async ({ loginPage }) => {
  await loginPage.fillUserNameAndPassword("wongsaphat", "P12@345");
  await loginPage.clickLoginButton();
  
  expect((await loginPage.checkResponse()).success).toBe(true);
});