from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest
import time

class TestAuth(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        cls.driver = webdriver.Chrome(options=chrome_options)
        cls.driver.implicitly_wait(10)
        cls.base_url = "http://localhost:5173"  # Vite dev server URL

    def setUp(self):
        self.driver.get(self.base_url)
        time.sleep(2)  # Wait for React to load

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_01_homepage_loads(self):
        """Test that the homepage loads successfully"""
        self.assertIn("Welcome", self.driver.page_source)

    def test_02_navigation_links_exist(self):
        """Test that navigation links are present"""
        login_link = self.driver.find_element(By.DATA_TEST_ID, "login-link")
        register_link = self.driver.find_element(By.DATA_TEST_ID, "register-link")
        self.assertTrue(login_link.is_displayed())
        self.assertTrue(register_link.is_displayed())

    def test_03_navigate_to_login(self):
        """Test navigation to login page"""
        login_link = self.driver.find_element(By.DATA_TEST_ID, "login-link")
        login_link.click()
        form = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.DATA_TEST_ID, "auth-form"))
        )
        self.assertTrue(form.is_displayed())

    def test_04_navigate_to_register(self):
        """Test navigation to register page"""
        register_link = self.driver.find_element(By.DATA_TEST_ID, "register-link")
        register_link.click()
        form = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.DATA_TEST_ID, "auth-form"))
        )
        self.assertTrue(form.is_displayed())

    def test_05_login_form_validation(self):
        """Test login form validation"""
        self.driver.find_element(By.DATA_TEST_ID, "login-link").click()
        submit_button = self.driver.find_element(By.DATA_TEST_ID, "submit-button")
        submit_button.click()
        # HTML5 validation will prevent form submission
        self.assertIn("Please fill out this field", self.driver.page_source)

    def test_06_register_form_validation(self):
        """Test register form validation"""
        self.driver.find_element(By.DATA_TEST_ID, "register-link").click()
        submit_button = self.driver.find_element(By.DATA_TEST_ID, "submit-button")
        submit_button.click()
        # HTML5 validation will prevent form submission
        self.assertIn("Please fill out this field", self.driver.page_source)

    def test_07_invalid_email_format(self):
        """Test invalid email format validation"""
        self.driver.find_element(By.DATA_TEST_ID, "login-link").click()
        email_input = self.driver.find_element(By.DATA_TEST_ID, "email-input")
        email_input.send_keys("invalid-email")
        email_input.submit()
        # HTML5 email validation
        self.assertTrue("Please include an '@' in the email address" in self.driver.page_source)

    def test_08_login_with_invalid_credentials(self):
        """Test login with invalid credentials"""
        self.driver.find_element(By.DATA_TEST_ID, "login-link").click()
        email_input = self.driver.find_element(By.DATA_TEST_ID, "email-input")
        password_input = self.driver.find_element(By.DATA_TEST_ID, "password-input")
        submit_button = self.driver.find_element(By.DATA_TEST_ID, "submit-button")

        email_input.send_keys("test@example.com")
        password_input.send_keys("wrongpassword")
        submit_button.click()

        error_message = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.DATA_TEST_ID, "error-message"))
        )
        self.assertTrue(error_message.is_displayed())

    def test_09_register_new_user(self):
        """Test registering a new user"""
        self.driver.find_element(By.DATA_TEST_ID, "register-link").click()
        email_input = self.driver.find_element(By.DATA_TEST_ID, "email-input")
        password_input = self.driver.find_element(By.DATA_TEST_ID, "password-input")
        submit_button = self.driver.find_element(By.DATA_TEST_ID, "submit-button")

        test_email = f"test{int(time.time())}@example.com"
        email_input.send_keys(test_email)
        password_input.send_keys("Test123!")
        submit_button.click()

        # Wait for registration process
        time.sleep(2)
        # Success case - no error message
        self.assertNotIn("error-message", self.driver.page_source)

    def test_10_password_minimum_length(self):
        """Test password minimum length requirement"""
        self.driver.find_element(By.DATA_TEST_ID, "register-link").click()
        email_input = self.driver.find_element(By.DATA_TEST_ID, "email-input")
        password_input = self.driver.find_element(By.DATA_TEST_ID, "password-input")
        submit_button = self.driver.find_element(By.DATA_TEST_ID, "submit-button")

        email_input.send_keys("test@example.com")
        password_input.send_keys("123")  # Too short
        submit_button.click()

        error_message = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.DATA_TEST_ID, "error-message"))
        )
        self.assertTrue(error_message.is_displayed())

if __name__ == '__main__':
    unittest.main()