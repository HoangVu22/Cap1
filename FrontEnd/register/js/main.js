// ---------header------------
var headerNavForm = document.querySelector('.header-nav-form')
var headerForm = document.querySelector('.header-form')
var headerFormLogin = headerNavForm.querySelector('.header-form-login')
var headerFormLogout = document.querySelector('.header-form-logout');
var login = window.localStorage.getItem("login")
const registerButton = document.querySelector('.form-submit.register')

// check emoji
function removeInvalidChars(text) {
  const check =  text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
  return check.length == text.length ? true : false
}


registerButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.form-control')
    const requestValues = {}

    inputs.forEach(item => {
        if (item.attributes.name.value !== "password_confirmation") {
            requestValues[item.attributes.name.value] = item.value
        }
    })
   

    fetch('http://localhost:1234/api/v1/auth/register', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestValues)
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                window.location.href = 'http://localhost:5500/FrontEnd/signin/index.html'
            }
        }) 
})

headerNavForm.onclick = function() {
    if (headerForm.style.display === "none")
        headerForm.style.display = "block"
    else {
        headerForm.style.display = "none"
    }

    handleIconLight()
}

function handleIconLight() {
    var iconList = headerNavIcon.querySelectorAll('i')
    iconList.forEach((item) => {
        if(headerFormLogout && headerFormLogout.style.display !== "none" || headerFormLogin && headerFormLogin.style.display !=="none") {
            item.style.color = "#f44336"
            headerNavIcon.style.borderColor = "#f44336"
        }
        else {
            item.style.color = "unset"
            headerNavIcon.style.borderColor = "unset"
        }
    })
}

// ?????i t?????ng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        } 
    }

    var selectorRules = {}; 

    // H??m th???c hi???n validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // L???y ra c??c rules c???a selector
        var rules = selectorRules[rule.selector];
        
        // L???p qua t???ng rule & ki???m tra
        // N???u c?? l???i th?? d???ng vi???c ki???m
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            // khi kh??ng nh???p v??o fullname th?? b??o l???i 'Vui l??ng nh???p tr?????ng n??y'
            errorElement.innerText = errorMessage; 
            // khi c?? l???i th?? hi???n m??u ?????
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            // khi nh???p value th?? tr??? v??? chu???i r???ng v?? m???t message 'Vui l??ng... '
            errorElement.innerText = '';
            // khi kh??ng c?? l???i th?? m???t m??u ?????
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // L???y element c???a form c???n validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        // b??? ??i h??nh vi m???c ?????nh c???a form khi submit
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // L???p qua t???ng rules v?? validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Tr?????ng h???p submit v???i javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Tr?????ng h???p submit v???i h??nh vi m???c ?????nh
                else {
                    formElement.submit();
                }
            }
        }

        // L???p qua m???i rule v?? x??? l?? (l???ng nghe s??? ki???n blur, input, ...)
        options.rules.forEach(function (rule) {

            // L??u l???i c??c rules cho m???i input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
               // X??? l?? tr?????ng h???p blur kh???i input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // X??? l?? m???i khi ng?????i d??ng nh???p v??o input
                // Khi ?? input b??? l???i th??, ng?????i d??ng nh???p l???i th?? m???t l???i ngay
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                } 
            });
        });
    }

}



// ?????nh ngh??a rules
// Nguy??n t???c c???a c??c rules:
// 1. Khi c?? l???i => Tr??? ra message l???i
// 2. Khi h???p l??? => Kh??ng tr??? ra c??i g?? c??? (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            // n???u nh???p value th?? tr??? v??? undefined v?? kh??ng c?? value th?? tr??? v??? message ' Vui l??ng.... '
            // trim() lo???i b??? c??c kho???ng tr???ng ( d???u c??ch )
            return value.trim() ? undefined :  message || 'Vui l??ng nh???p tr?????ng n??y'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            // Ki???m tra c?? ph???i l?? email hay k (ph???i c?? @ v?? gmail.com)
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ?  undefined :  message || 'Tr?????ng n??y ph???i l?? email';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    // min : ????? d??i t???i thi???u m?? we mong mu???n l?? g??
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Vui l??ng nh???p t???i thi???u ${min} k?? t???`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Gi?? tr??? nh???p v??o kh??ng ch??nh x??c';
        }
    }
}