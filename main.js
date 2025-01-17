document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('input');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-btn');
    const togglePassword = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('errorMessage');

    // Устанавливаем дефолтные данные, если они еще не сохранены
    function setDefaultCredentials() {
        const defaultCredentials = {
            username: 'admin',
            password: '12345'
        };

        // Очистить localStorage перед установкой новых данных
        localStorage.clear();  // Очистим все данные в localStorage

        // Если нет данных в localStorage, установить дефолтные
        if (!localStorage.getItem('credentials')) {
            localStorage.setItem('credentials', JSON.stringify(defaultCredentials));
            console.log('Дефолтные данные установлены');
        } else {
            console.log('Данные в localStorage уже установлены:', JSON.parse(localStorage.getItem('credentials')));
        }
    }

    setDefaultCredentials();

    // Функция для проверки полей
    function checkFields() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        submitButton.disabled = !(username && password);  // Кнопка активируется только если оба поля не пустые
    }

    usernameInput.addEventListener('input', checkFields);
    passwordInput.addEventListener('input', checkFields);

    // Слушатель для отображения пароля
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = '👁';
        }
    });

    // Обработчик формы, когда пользователь нажимает "Submit"
    form.addEventListener('submit', (event) => {
        event.preventDefault();  // Отменить стандартное поведение формы
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const storedCredentials = JSON.parse(localStorage.getItem('credentials'));

        console.log('Введенные данные:', { username, password });
        console.log('Данные из localStorage:', storedCredentials);

        // Проверка логина и пароля
        if (storedCredentials && username === storedCredentials.username && password === storedCredentials.password) {
            console.log('Данные правильные. Переход на страницу...');
            window.location.href = '2.html';  // Перенаправление на другую страницу
        } else {
            console.log('Данные неправильные.');
            errorMessage.textContent = 'Неправильно';  // Показываем сообщение об ошибке
            errorMessage.style.display = 'block';
        }
    });
});

