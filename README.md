# Функция-обёртка над обработчиком отправки формы

Используется для работы Yandex SmartCaptcha. Принимает в себя два параметра:
1. ```form``` - ```DOMElement``` формы.
2. ```sendHandler``` - Callback, который будет вызван после проверки токена 
   на стороне сервера

Нужно вызывать для каждой формы на сайте, которая использует Яндекс 
SmartCaptcha. В переданном ```form``` **функция** при вызове **сама создает** 
```html
<input type="hidden" name="captcha-widget-id" value="<ID_ВИДЖЕТА_КАПЧИ>">
```
Этот **скрытый инпут** нужен для **идентификации** того, на каком контейнере 
вызывать метод ```window.smartcaptcha.execute(<ID_ВИДЖЕТА_КАПЧИ>)```

[Документация к функции](./out/global.html#sendFormWrapper)

## Использование
* 1С-Битрикс
```php
<?php
// ...
use Bitrix\Main\Page\Asset;
$asset = Asset::getInstance();

// Yandex Captcha
$asset->addJs("https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=initYandexCaptcha");

$asset->addJs(SITE_TEMPLATE_PATH."/mediamint_yandexCaptchaWrapper.js");
```

* HTML
```html
<head>
   ...
   <script src="https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=initYandexCaptcha" defer></script>
   <script src="<path_to_folder>/mediamint_yandexCaptchaWrapper.js"></script>
</head>
```

На странице сайта форма должна иметь следующий вид:
```html
<!-- 
ID формы используется только для её получения в качестве DOMElement-а, 
можно указывать удобный Вам 
-->
<form action="" method="POST" id="callback-form">
   <!-- ... -->
   
    <!-- Контейнер для отрисовки капчи  -->
   <div data-yandex-captcha></div>
</form>
```

В JavaScript файле страницы
```javascript
// Отправка формы через fetch и сохранение данных
async function sendForm(form) {
    // ...
}

document.addEventListener("DOMContentLoaded", () => {
    // получение DOMElement формы с id=callback-form
    // Пример - <form action="" method="POST" id="callback-form">
    const formElement = document.getElementById("callback-form");

    // Вызываем функцию-обёртку
   sendFormWrapper(form, sendForm);
})
```