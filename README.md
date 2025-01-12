
# NestJS 登录注册功能

基于 NestJS 实现的一个完整的用户登录和注册功能，支持以下特性：
- **用户注册**：创建新用户并存储到数据库。
- **用户登录**：验证用户凭据并返回 JWT 令牌。
- **JWT**: 身份验证**：使用非对称加密（RSA）生成和验证 JWT 令牌。
- **密码加密**：使用 `bcrypt` 对用户密码进行哈希存储。
- **数据验证**：使用 `class-validator` 对请求数据进行验证。

## 快速开始

### 安装依赖

1. 克隆项目到本地：

   ```bash
   cd nestjs-auth
   ```

2. 安装依赖：

   ```bash
   npm install
   ```



### 配置环境变量

1. 复制 `.env.example` 文件并重命名为 `.env`：

   ```bash
   cp .env.example .env
   ```

2. 在 `.env` 文件中配置以下环境变量：

   ```env
    # 密钥
    JWT_PRIVATE_KEY_PASSPHRASE = ''
    # 监听
    LISTEN_HOST=127.0.0.1
    LISTEN_PORT=8838
    # 数据库配置
    DB_TYPE=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=your_password
    DB_NAME=your_database
   ```

3. 生成 RSA 密钥对并放置在 `src/auth/keys` 目录下：

   ```bash
   # 生成私钥
   openssl genpkey -algorithm RSA -out src/auth/keys/private.key -aes256

   # 生成公钥
   openssl rsa -in src/auth/keys/private.key -pubout -out src/auth/keys/public.key
   ```



### 运行项目

1. 启动开发服务器：

   ```bash
   npm run start:dev
   ```

2. 访问 `http://localhost:3000`，API 服务已启动。

---

## API 文档

### 用户注册

- **URL**: `/user/register`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  ```

- **Response**:

  ```json
  {
    "id": 1,
    "username": "testuser",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  }
  ```



### 用户登录

- **URL**: `/user/login`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  ```

- **Response**:

  ```json
  {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```


---

## 技术栈

- **核心框架**：NestJS（基于 Express）。
- **数据库**：TypeORM + MySQL。
- **身份验证**：Passport（本地策略 + JWT 策略）。
- **密码加密**：Bcrypt。
- **数据验证**：Class Validator。
- **配置管理**：NestJS Config。
- **工具库**：Reflect Metadata、Mapped Types...

---

## 项目结构

```
src/
├── auth/                    # 身份验证模块
│   ├── auth.service.ts      # 身份验证服务
│   ├── auth.module.ts       # 身份验证模块
│   ├── jwt.strategy.ts      # JWT 策略
│   └── keys/                # RSA 密钥对
├── user/                    # 用户模块
│   ├── user.entity.ts       # 用户实体
│   ├── user.service.ts      # 用户服务
│   ├── user.controller.ts   # 用户控制器
│   └── dto/                 # 数据传输对象
├── app.module.ts            # 根模块
└── main.ts                  # 应用程序入口
```

感谢使用本项目！如果有任何问题或建议，欢迎提交 Issue 或联系作者。
