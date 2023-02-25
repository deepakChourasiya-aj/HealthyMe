
# HealthyMe.com 

Ecommerece website for health and fitness product.

## Tech Stack

**Client:** HTML,CSS, Javascript

**Server:** Node, Express , MongoDB


## Frontend Part

- Home page
- Login/Signup
- Product page
- Cart page
- Admin page

## Backend Part
- Authentication using JWT
- Hashing the password using Bcrypt
- Mongoose - connecting the database
### Database - 
    - MongoDB

## API Reference

#### User Endpoints

```http
  Signup

  POST /user/signup/
```
```http
  Login

  POST /user/login/
```
#### Get all products

```http
  GET /admin/all
```

#### Add products

```http
  POST /admin/add/
```
#### Delete products

```http
  DELETE /delete/:id
```
#### Update products

```http
  PATCH /delete/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `product key` | `string` | **Required**. Your API key |







| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Add items

```http
  POST /admin/add/
```



## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

