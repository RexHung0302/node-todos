# Nodejs - Todo List

這是第一次使用後端語言寫一個 [CRUD](https://zh.wikipedia.org/zh-tw/%E5%A2%9E%E5%88%AA%E6%9F%A5%E6%94%B9) 出來，在路由的安排上還是菜味十足，還望各路大神多多海涵。

原本打算使用 [csrf](https://github.com/expressjs/csurf) 來擋 [DDoS](https://zh.wikipedia.org/wiki/%E9%98%BB%E6%96%B7%E6%9C%8D%E5%8B%99%E6%94%BB%E6%93%8A)，但因為把資料夾拆成了 `routes -> controllers -> models` 所以在使用上碰到一點問題，之後會在研究怎麼改進及使用。

另外帳號註冊成功會收到一封 Email，這邊沒有特別去註冊寄送 Email 的 Token，直接開啟 Gmail 的 **低安全性應用程式存取權**，這邊不建議這麼做，但因方便於練習，所以此次創建了一個新的 Gmail 來發送郵件。

最後這次使用 Heroku 來呈現 Demo，不知道為什麼環境變數卡很久。

這次的實作相關心得也可參考 [[NodeJS Become A Full Stack Developer] — 菜雞必經之路 👉 實作一個 Todo List](https://rexhung0302.github.io/2020/10/13/20201013/)。

> *本次練習為 [六角學院 - NodeJS 前後端開發實戰](https://www.hexschool.com/courses/nodejs.html) 的章節練習。*

## Demo

[Demo](https://express-todos-list.herokuapp.com/users/login)

![Demo Gif](/demo.gif)

![Demo Sign Up Success Email](/mail_demo.png)

## 運作環境
* Node.js - v12.16.1(筆者建立環境)
* Nvm - v0.35.0(筆者建立環境)
* Chrome v49+ or Firefox v45+ or Safari v9+
* 一台筆電 或 桌電 或 近代的手機(至少要能跑 Angry Birds )
* 一顆炙熱的寫 Code ❤️
* 至少有充足的睡眠(8/hr+)
* 至少保證自己吃過早點 或 晚餐(3餐+)
* 沒有喝酒的情況下

---

## 環境 domain 說明

```
$ git clone git@github.com:RexHung0302/node-todos.git node-todos

$ cd node-todos

$ cp .env.example .env

$ vim .env(Fill in config)

$ npm run dev

Enjoy it
```

---
   
## 使用套件

### 前端

[bootstrap-v4.5.2](https://getbootstrap.com/) 前端 CSS 框架

[sweetalert2-v8.11.8](https://sweetalert2.github.io/) 美化及優化的 Alert 套件

[animate.css-v3.7.2](https://daneden.github.io/animate.css/) Animate 動畫套件

[AXIOS-v0.20.0](https://github.com/axios/axios) AXIOS

### 後端

[connect-flash-v0.1.1](https://github.com/jaredhanson/connect-flash) 快取套件 需搭配 express-session

[express-session-v1.17.1](https://github.com/expressjs/session#readme) Session 套件 可存放一些資訊在頁面上

[firebase-v7.21.1](https://github.com/firebase/) Firebase 套件庫 - 可使用帳號驗證等服務

[firebase-admin-v9.2.0](https://github.com/firebase/) Firebase 套件庫 - 可使用 Firebase 服務 例：DB

[nodemailer-v6.4.13](https://github.com/nodemailer/nodemailer) 郵件服務

[express-validator-v6.6.1](https://express-validator.github.io/docs/) 驗證套件

[nodemon-v2.0.4](https://github.com/remy/nodemon) 後端熱更新

---

## 前端安裝方式

放心沒有前端

## 後端安裝方式


1. 打開 node-todos (或你 git clone 下來目的地的) 資料夾

2. 修改設定 js 資料夾內的 env 設定檔

3. Enjoy!

---

## API

| Functions              | Detail                                            | URL                         |
| :--------------------: | ------------------------------------------------- | --------------------------- |
| 註冊 | 1. 使用者可使用信箱及密碼註冊自己的待辦清單帳號.<br>2. 使用者可能會獲取錯誤或成功資訊，如果輸入錯誤或正確的格式. | /user/sign-up |
| 登入 | 1. 使用者可使用信箱及密碼登入.<br>2. 使用者可能會獲取錯誤或成功資訊，如果輸入錯誤或正確的格式. | /user/login |
| 登出 | 1. 使用者可登出及清除再 Session 的相關資訊和 Token. | /user/logout |
| 首頁 | 1. 使用者可查看所有待辦事項的地方. | / |
| 新增待辦事項 | 1. 使用者可新增待辦事項.<br>2. 使用者可能會獲取錯誤資訊，如果輸入錯誤的格式.<br>3. 如果輸入錯誤資訊後，後端會彈出錯誤訊息並自動帶回原本使用者輸入的資訊，提升使用者體驗. | /newTask |
| 刪除待辦事項 | 1. 使用者可刪除待辦事項. | /deleteTodo |
| 編輯待辦事項 | 1. 使用者可編輯待辦事項.<br>2. 使用者可能會獲取錯誤資訊，如果輸入錯誤的格式.<br>3. 如果輸入錯誤資訊後，後端會彈出錯誤訊息並自動帶回原本使用者輸入的資訊，提升使用者體驗. | /editTask/:id |
| 變更待辦事項狀態 | 1. 使用者可變更待辦事項完成狀態. | /changeStatus |

> *關於路由的安排還有很大的進步空間，請各路大神多多手下留情，但參考了其他大神的路由安排，拆成 `routes -> controllers -> models` 看起來真的乾淨且好閱讀許多。*

---
 
## 環境設定

### 充足的睡眠

1. 確保有睡滿8小時

2. 不要熬夜

### 保證有吃過早餐

1. 記得少吃油類早餐

2. 高蛋白質的早餐，可使人思考敏銳、反應靈活，並且提高學習和工作效率

---

## 商業邏輯備註

1. 發大財
2. 發大財
3. 發大財