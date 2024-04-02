/**
 * @author Bychkov Leonid <bychkov.l47@mail.ru>
 * @created 2024-04-02
 * @date 2024-04-02
 *
 * @description Отправляет форму **form** с использованием функции-обработчика **sendHandler**.
 * <br>
 *
 * <span style="color: red; font-weight: bold;">Важно!</span><br>
 * После выполнения проверки токена на сервере вызывается
 * ```javascript
 * sendHandler(form);
 * ```
 * поэтому вам необходимо в вашей функции отправки формы принимать один параметр - ```DOMElement``` формы
 *
 * @param {DOMElement} form - DOM-элемент формы, который необходимо отправить.
 * @param {Function} sendHandler - Функция, которая будет вызвана перед отправкой формы.
 * Эта функция должна принимать один параметр: DOMElement формы
 * @returns {void} - Ничего не возвращает
 */
function sendFormWrapper(form, sendHandler) {
    // отрисовка капчи в контейнер в форме и создание скрытого инпута с ID виджета
    function initYandexCaptcha(form) {
        if (!window.smartCaptcha) {
            console.error("no yandex captcha");
            return;
        }

        const captchaContainer = form.querySelector("[data-yandex-captcha]");

        const captchaId = window.smartCaptcha.render(captchaContainer, {
            sitekey: '<КЛЮЧ_КЛИЕНТА>',
            invisible: true, // Сделать капчу невидимой
            hideShield: true,
            hl: 'ru',
            callback: validateYandexCaptchaToken
        });

        const captchaIdInput = document.createElement("input");
        captchaIdInput.type = 'hidden';
        captchaIdInput.name = "captcha-widget-id";
        captchaIdInput.value = captchaId;

        form.appendChild(captchaIdInput);
    }

    // вызывается при вызове window.smartCaptcha.execute()

    async function validateYandexCaptchaToken(token) {
        const url = '<ПУТЬ_К_ВАЛИДАТОРУ_КЛЮЧА_СЕРВЕРА>';
        const formData = new FormData();
        formData.append("smart-token", token);

        let response, responseData = null;

        try {
            response = await fetch(url, {
                method: "POST",
                body: formData,
            })

            responseData = await response.json();
        }
        catch (e) {
            console.error("Ошибка при проверки капчи:", e);
            return;
        }

        if (responseData.status !== "ok") {
            console.error("Ошибка при проверке капчи");
            return;
        }

        // асинхронная
        sendHandler(form);
    }
    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const captchaId = form.querySelector('[name="captcha-widget-id"]').value;
        window.smartCaptcha.execute(captchaId);
    }

    // рисуем капчу в форму
    initYandexCaptcha(form);

    form.addEventListener('submit', handleSubmit);
}