// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Validate inputs
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Simulate login (in real app, send to backend)
        console.log('Login attempt:', { email, remember });
        
        // Store user session
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }

        // Redirect to home page
        alert('Login successful!');
        window.location.href = 'index.html';
    });
}

// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    // Password toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function(e) {
            e.preventDefault();
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
    // Real-time validation for Name field
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            const name = this.value.trim();
            const nameError = document.getElementById('nameError');
            
            console.log('Name input changed:', name); // DEBUG
            
            if (!name) {
                nameError.textContent = '✗ Full name is required';
                nameError.classList.add('show');
                console.log('Error: name required'); // DEBUG
            } else if (/\d/.test(name)) {
                // CHECK FOR NUMBERS FIRST - BEFORE LENGTH CHECK
                nameError.textContent = '✗ Name cannot contain numbers';
                nameError.classList.add('show');
                console.log('Error: name has numbers'); // DEBUG
            } else if (name.length < 2) {
                nameError.textContent = '✗ Name must be at least 2 characters';
                nameError.classList.add('show');
                console.log('Error: name too short'); // DEBUG
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                nameError.textContent = '✗ Name can only contain letters and spaces';
                nameError.classList.add('show');
                console.log('Error: name has special chars'); // DEBUG
            } else {
                nameError.textContent = '';
                nameError.classList.remove('show');
                console.log('Name valid'); // DEBUG
            }
        });
    }

    // Real-time validation for Phone field
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            const phone = this.value.trim();
            const phoneError = document.getElementById('phoneError');
            const digitsOnly = phone.replace(/\D/g, '');
            
            if (!phone) {
                phoneError.textContent = '✗ Phone number is required';
                phoneError.classList.add('show');
            } else if (digitsOnly.length > 0 && (digitsOnly[0] < '6' || digitsOnly[0] > '9')) {
                phoneError.textContent = '✗ Phone number must start with 6, 7, 8, or 9';
                phoneError.classList.add('show');
            } else if (digitsOnly.length !== 10) {
                phoneError.textContent = '✗ Phone number must be exactly 10 digits';
                phoneError.classList.add('show');
            } else {
                phoneError.textContent = '';
                phoneError.classList.remove('show');
            }
        });
    }

    // Real-time validation for Email field
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            const emailError = document.getElementById('emailError');
            
            if (!email) {
                emailError.textContent = '✗ Email address is required';
                emailError.classList.add('show');
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    emailError.textContent = '✗ Please enter a valid email address';
                    emailError.classList.add('show');
                } else {
                    emailError.textContent = '';
                    emailError.classList.remove('show');
                }
            }
        });
    }

    // Real-time validation for Address field
    const addressInput = document.getElementById('address');
    if (addressInput) {
        addressInput.addEventListener('input', function() {
            const address = this.value.trim();
            const addressError = document.getElementById('addressError');
            
            if (!address) {
                addressError.textContent = '✗ Address is required';
                addressError.classList.add('show');
            } else if (address.length < 5) {
                addressError.textContent = '✗ Address must be at least 5 characters';
                addressError.classList.add('show');
            } else {
                addressError.textContent = '';
                addressError.classList.remove('show');
            }
        });
    }

    // Real-time validation for City field
    const citySelect = document.getElementById('city');
    if (citySelect) {
        citySelect.addEventListener('change', function() {
            const cityError = document.getElementById('cityError');
            if (this.value) {
                cityError.textContent = '';
                cityError.classList.remove('show');
            } else {
                cityError.textContent = '✗ Please select a city';
                cityError.classList.add('show');
            }
        });
    }

    // Real-time validation for Gender field
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    if (genderRadios.length > 0) {
        genderRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const genderError = document.getElementById('genderError');
                if (document.querySelector('input[name="gender"]:checked')) {
                    genderError.textContent = '';
                    genderError.classList.remove('show');
                }
            });
        });
    }

    // Real-time validation for DOB field
    const dobInput = document.getElementById('dob');
    if (dobInput) {
        dobInput.addEventListener('change', function() {
            const dob = this.value;
            const dobError = document.getElementById('dobError');
            
            if (!dob) {
                dobError.textContent = '✗ Date of birth is required';
                dobError.classList.add('show');
            } else {
                const birthDate = new Date(dob);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 18) {
                    dobError.textContent = '✗ You must be at least 18 years old';
                    dobError.classList.add('show');
                } else {
                    dobError.textContent = '';
                    dobError.classList.remove('show');
                }
            }
        });
    }

    // Real-time validation for Password field
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const passwordError = document.getElementById('passwordError');
            
            // Check requirements
            const hasLength = password.length >= 8;
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            
            // Update requirement indicators
            updateRequirement('req-length', hasLength);
            updateRequirement('req-uppercase', hasUppercase);
            updateRequirement('req-lowercase', hasLowercase);
            updateRequirement('req-number', hasNumber);
            
            // Calculate strength
            let strength = 0;
            if (hasLength) strength++;
            if (hasUppercase) strength++;
            if (hasLowercase) strength++;
            if (hasNumber) strength++;
            
            // Update strength bars
            updateStrengthBars(strength);
            
            // Check validation
            if (!password) {
                passwordError.textContent = '✗ Password is required';
                passwordError.classList.add('show');
            } else if (password.length < 8) {
                passwordError.textContent = '✗ Password must be at least 8 characters';
                passwordError.classList.add('show');
            } else if (!hasUppercase) {
                passwordError.textContent = '✗ Password must contain at least one uppercase letter';
                passwordError.classList.add('show');
            } else if (!hasLowercase) {
                passwordError.textContent = '✗ Password must contain at least one lowercase letter';
                passwordError.classList.add('show');
            } else if (!hasNumber) {
                passwordError.textContent = '✗ Password must contain at least one number';
                passwordError.classList.add('show');
            } else {
                passwordError.textContent = '';
                passwordError.classList.remove('show');
                // Also check confirm password if it has a value
                const confirmPassword = document.getElementById('confirmPassword').value;
                if (confirmPassword && confirmPassword !== password) {
                    document.getElementById('confirmPasswordError').textContent = '✗ Passwords do not match';
                    document.getElementById('confirmPasswordError').classList.add('show');
                } else if (confirmPassword === password) {
                    document.getElementById('confirmPasswordError').textContent = '';
                    document.getElementById('confirmPasswordError').classList.remove('show');
                }
            }
        });
    }

    // Helper function to update requirement indicators
    function updateRequirement(id, met) {
        const req = document.getElementById(id);
        if (met) {
            req.classList.add('met');
            req.querySelector('i').classList.remove('fa-times');
            req.querySelector('i').classList.add('fa-check');
        } else {
            req.classList.remove('met');
            req.querySelector('i').classList.add('fa-times');
            req.querySelector('i').classList.remove('fa-check');
        }
    }

    // Helper function to update strength bars
    function updateStrengthBars(strength) {
        const bars = document.querySelectorAll('.strength-bar');
        const strengthText = document.getElementById('strengthText');
        
        bars.forEach((bar, index) => {
            bar.classList.remove('active', 'medium', 'good');
            if (index < strength) {
                if (strength === 1 || strength === 2) {
                    bar.classList.add('active');
                } else if (strength === 3) {
                    bar.classList.add('medium');
                } else if (strength === 4) {
                    bar.classList.add('good');
                }
            }
        });
        
        // Update strength text
        strengthText.classList.remove('weak', 'medium', 'strong');
        if (strength === 1 || strength === 2) {
            strengthText.textContent = 'Weak';
            strengthText.classList.add('weak');
        } else if (strength === 3) {
            strengthText.textContent = 'Medium';
            strengthText.classList.add('medium');
        } else if (strength === 4) {
            strengthText.textContent = 'Strong';
            strengthText.classList.add('strong');
        }
    }

    // Real-time validation for Confirm Password field
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const confirmPassword = this.value;
            const password = document.getElementById('password').value;
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            
            if (!confirmPassword) {
                confirmPasswordError.textContent = '✗ Please confirm your password';
                confirmPasswordError.classList.add('show');
            } else if (password && password !== confirmPassword) {
                confirmPasswordError.textContent = '✗ Passwords do not match';
                confirmPasswordError.classList.add('show');
            } else {
                confirmPasswordError.textContent = '';
                confirmPasswordError.classList.remove('show');
            }
        });
    }

    // Real-time validation for Terms checkbox
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            const termsError = document.getElementById('termsError');
            if (this.checked) {
                termsError.textContent = '';
                termsError.classList.remove('show');
            }
        });
    }

    // Real-time validation for Preferences checkboxes
    const preferenceCheckboxes = document.querySelectorAll('input[name="preferences"]');
    if (preferenceCheckboxes.length > 0) {
        preferenceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const preferencesError = document.getElementById('preferencesError');
                const isAnyChecked = document.querySelector('input[name="preferences"]:checked');
                if (isAnyChecked) {
                    preferencesError.textContent = '';
                    preferencesError.classList.remove('show');
                }
            });
        });
    }

    // Form submission handler
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('✅ Form submit triggered'); 
        
        // IMMEDIATELY check validation
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const dob = document.getElementById('dob').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        const preferences = Array.from(document.querySelectorAll('input[name="preferences"]:checked')).map(cb => cb.value);

        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(el => {
            el.textContent = '';
            el.classList.remove('show');
        });

        let isValid = true;

        // Name validation
        if (!name) {
            const el = document.getElementById('nameError');
            el.textContent = '✗ Full name is required';
            el.classList.add('show');
            isValid = false;
        } else if (name.length < 2) {
            const el = document.getElementById('nameError');
            el.textContent = '✗ Name must be at least 2 characters';
            el.classList.add('show');
            isValid = false;
        } else if (/\d/.test(name)) {
            const el = document.getElementById('nameError');
            el.textContent = '✗ Name cannot contain numbers';
            el.classList.add('show');
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            const el = document.getElementById('nameError');
            el.textContent = '✗ Name can only contain letters and spaces';
            el.classList.add('show');
            isValid = false;
        }

        // Phone validation
        const phoneDigitsOnly = phone.replace(/\D/g, '');
        if (!phone) {
            const el = document.getElementById('phoneError');
            el.textContent = '✗ Phone number is required';
            el.classList.add('show');
            isValid = false;
        } else if (phoneDigitsOnly.length !== 10) {
            const el = document.getElementById('phoneError');
            el.textContent = '✗ Phone number must be exactly 10 digits';
            el.classList.add('show');
            isValid = false;
        } else if (phoneDigitsOnly[0] < '6' || phoneDigitsOnly[0] > '9') {
            const el = document.getElementById('phoneError');
            el.textContent = '✗ Phone number must start with 6, 7, 8, or 9';
            el.classList.add('show');
            isValid = false;
        }

        // Email validation
        if (!email) {
            const el = document.getElementById('emailError');
            el.textContent = '✗ Email address is required';
            el.classList.add('show');
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const el = document.getElementById('emailError');
                el.textContent = '✗ Please enter a valid email address';
                el.classList.add('show');
                isValid = false;
            }
        }

        // Address validation
        if (!address) {
            const el = document.getElementById('addressError');
            el.textContent = '✗ Address is required';
            el.classList.add('show');
            isValid = false;
        } else if (address.length < 5) {
            const el = document.getElementById('addressError');
            el.textContent = '✗ Address must be at least 5 characters';
            el.classList.add('show');
            isValid = false;
        }

        // City validation
        if (!city) {
            const el = document.getElementById('cityError');
            el.textContent = '✗ Please select a city';
            el.classList.add('show');
            isValid = false;
        }

        // Gender validation
        if (!gender) {
            const el = document.getElementById('genderError');
            el.textContent = '✗ Please select your gender';
            el.classList.add('show');
            isValid = false;
        }

        // DOB validation
        if (!dob) {
            const el = document.getElementById('dobError');
            el.textContent = '✗ Date of birth is required';
            el.classList.add('show');
            isValid = false;
        } else {
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                const el = document.getElementById('dobError');
                el.textContent = '✗ You must be at least 18 years old';
                el.classList.add('show');
                isValid = false;
            }
        }

        // Preferences validation
        if (preferences.length === 0) {
            const el = document.getElementById('preferencesError');
            el.textContent = '✗ Please select at least one preference';
            el.classList.add('show');
            isValid = false;
        }

        // Password validation
        if (!password) {
            const el = document.getElementById('passwordError');
            el.textContent = '✗ Password is required';
            el.classList.add('show');
            isValid = false;
        } else if (password.length < 8) {
            const el = document.getElementById('passwordError');
            el.textContent = '✗ Password must be at least 8 characters';
            el.classList.add('show');
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            const el = document.getElementById('passwordError');
            el.textContent = '✗ Password must contain uppercase letter';
            el.classList.add('show');
            isValid = false;
        } else if (!/[a-z]/.test(password)) {
            const el = document.getElementById('passwordError');
            el.textContent = '✗ Password must contain lowercase letter';
            el.classList.add('show');
            isValid = false;
        } else if (!/[0-9]/.test(password)) {
            const el = document.getElementById('passwordError');
            el.textContent = '✗ Password must contain a number';
            el.classList.add('show');
            isValid = false;
        }

        // Confirm password validation
        if (!confirmPassword) {
            const el = document.getElementById('confirmPasswordError');
            el.textContent = '✗ Please confirm your password';
            el.classList.add('show');
            isValid = false;
        } else if (password && password !== confirmPassword) {
            const el = document.getElementById('confirmPasswordError');
            el.textContent = '✗ Passwords do not match';
            el.classList.add('show');
            isValid = false;
        }

        // Terms and Conditions validation
        if (!terms) {
            const el = document.getElementById('termsError');
            el.textContent = '✗ You must agree to Terms & Conditions';
            el.classList.add('show');
            isValid = false;
        }

        console.log('Is form valid:', isValid);
        
        // ⚠️ VALIDATION FAILED - SHOW ERRORS AND STOP ⚠️
        if (!isValid) {
            console.error('❌ FORM HAS ERRORS - NOT SUBMITTING');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false; // ABSOLUTELY STOP HERE
        }
        
        // ✅ VALIDATION PASSED - ONLY THEN SUBMIT
        console.log('✅ ALL VALIDATIONS PASSED - SUBMITTING FORM');
        
        const genderValue = document.querySelector('input[name="gender"]:checked').value;
        const formData = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            gender: genderValue,
            dob: dob,
            password: password,
            preferences: preferences.join(', '),
            registrationDate: new Date().toLocaleString()
        };

        // Send data via AJAX POST
        fetch('register-process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Store in localStorage
            let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
            registrations.push(formData);
            localStorage.setItem('registrations', JSON.stringify(registrations));
            
            // Also store current user
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', name);

            // Show success message and redirect
            alert('Account created successfully!');
            window.location.href = 'user-registrations.html';
        })
        .catch(error => {
            console.log('AJAX request (server not available, using localStorage only):', error);
            // If server not available, still save locally
            let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
            registrations.push(formData);
            localStorage.setItem('registrations', JSON.stringify(registrations));
            
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', name);

            alert('Account created successfully!');
            window.location.href = 'user-registrations.html';
        });
    });
}

// Social Login Handlers
const socialBtns = document.querySelectorAll('.social-btn');
socialBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const provider = this.textContent.includes('Google') ? 'Google' : 'Facebook';
        alert(`${provider} login functionality would be implemented here`);
        // In real app, this would integrate with OAuth providers
    });
});

// Check if user is logged in and update UI
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    
    // This can be expanded to show user info or redirect logged-in users
    if (isLoggedIn) {
        console.log('User logged in as:', userEmail);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);
