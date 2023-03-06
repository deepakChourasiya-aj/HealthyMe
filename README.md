
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

![image](https://user-images.githubusercontent.com/109690823/223182325-47fc063c-11db-4559-91e2-199fba399d6c.png)
![image](https://user-images.githubusercontent.com/109690823/223182773-0b4fbf6a-be2e-4506-afe7-5aeec790eab6.png)




