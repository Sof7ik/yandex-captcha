# Функция-обёртка над обработчиком отправки формы

Используется для работы Yandex SmartCaptcha. Принимает в себя два параметра:
1. ```form``` - ```DOMElement``` формы.
2. ```sendHandler``` - Callback, который будет вызван после проверки токена 
   на стороне сервера

[Документация к функции](./out/global.html#sendFormWrapper);

## Использование
### 1С-Битрикс
```php
<?php
// ...
use Bitrix\Main\Page\Asset;
$asset = Asset::getInstance();

// Yandex Captcha
$asset->addJs("https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=initYandexCaptcha");

$asset->addJs(SITE_TEMPLATE_PATH."/mediamint_yandexCaptchaWrapper.js");
```

### HTML
```html
<head>
   ...
   <script src="https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=initYandexCaptcha" defer></script>
   <script src="<path_to_folder>/mediamint_yandexCaptchaWrapper.js"></script>
</head>
```