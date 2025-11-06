# Обучающий репозиторий FastAPI и ReactJS

Цель данного репозитория - научиться создавать простые Web приложения, показать взаимодействие между Фронтенд и Бэкенд частями

## Настройка окружения для работы

### Python

Для запуска бэкенда необходима установка пакетного менеджера [uv](https://docs.astral.sh/uv/getting-started/installation/)
После установки необходимо запустить сервер разработки командой, находясь в папке `backend``

```bash
uv run fastapi dev
```

### Frontend

Фронтенд часть реализована на Vite и ReactJS с библиотеками:

1. [Ant Design](https://ant.design/)
2. [Ant Design Icons](https://ant.design/components/icon)
3. [React Router](https://reactrouter.com/)

Для запуска необходимо, чтобы в системе был установлен Node.JS .
В данном случае предлагается установка через специальный менеджер - NVM.

* для MacOS и Linux - [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
* для Windows - [nvm-windows](https://github.com/coreybutler/nvm-windows)

После установки NVM необходимо установить нужный пакет командой

```bash
nvm install 22
```

После установки в папке `frontend` нужно запустить команду для установки всех зависимостей

```bash
npm i
```

После установки пакетов проект запускается командой

```bash
npm run dev
```

После запуска всех компонентов проект должен быть доступен и готов к работе
