# NodeJS,Mongoose,Express Project in MVC Architecture

**Supported version of nodejs >= 12**,
**Supported version of mongoose >= 6**

## About

- This is a Node application, developed using MVC pattern with Node.js, ExpressJS, and Mongoose.
- MongoDB database is used for data storage, with object modeling provided by Mongoose.

## Initial

1. `$ npm install`
2. `$ npm start`

# API Document

## Token Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTYzMTI1NjIsImV4cCI6MTY1NjMxMjg2MiwiYXVkIjoiMyJ9.ULs9tOpG5GfoZbJSTA20GNXV898vVIODsYVhlDXWgeU
```

## Health check.

```
1. check API is working or not
   * request type : GET
   * url : {{url}}/api
   * request headers: not required
   * response : Successfully Connected
```

```
2. check DB is connected or not
   * request type : GET
   * url : {{url}}/mongodb
   * request headers: not required
   * response : Database Successfully Connected
```

## Login Flow.

```
1. login user
   * request type : POST
   * url : {{url}}/v1/user/login
   * request headers: not required
   * request body : {
						"username":"mark"
					}
   * response : {
					"status": "SUCCESS",
					"message": "Login Successful.",
					"data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJiZDUxOTVhOTZhN2Q1YWE3YjU2MmIiLCJpYXQiOjE2OTAwMzEzODUsImV4cCI6MTY5MjYyMzM4NX0.IH7y7gRZcK72RaQpEunIr68YfsCbtU34My0RN2pA_3E"
				}
```


## Profile

```
1. Add Profile
   * request type : POST
   * url : {{url}}/v1/profile
   * request headers: not required
   * request body : {
						"name": "Bapu",
						"description": "Bapu",
						"mbti": "ISFJ",
						"enneagram": "4w5",
						"variant": "sp/so",
						"tritype": "950",
						"socionics": "SEE",
						"sloan": "RCOEN",
						"psyche": "FEVL",
						"image": "https://soulverse.boo.world/images/1.png"
					}
   * response :{
					"status": "SUCCESS",
					"message": "Profile created successfully.",
					"data": {
						"name": "Bapu",
						"description": "Bapu",
						"mbti": "ISFJ",
						"enneagram": "4w5",
						"variant": "sp/so",
						"tritype": "950",
						"socionics": "SEE",
						"sloan": "RCOEN",
						"psyche": "FEVL",
						"image": "https://soulverse.boo.world/images/1.png",
						"isActive": true,
						"isDeleted": false,
						"createdAt": "2023-07-22T10:04:59.464Z",
						"updatedAt": "2023-07-22T10:04:59.464Z",
						"id": "64bba9cbdf47d8f4fdfa4869"
					}
				}
```

```
2. Voting or comment on Profile
   * request type : POST
   * url : {{url}}/v1/profile/feedback/{{profileId}}
   * request headers: require Token ***Token Format***
   * request body:{
					"comment":"No 1",
					"title":"Boss",
					"mbti":"ESTJ",
					"enneagram":"9w8",
					"zodiac":"Taurus"
				}
   * response :{
					"status": "SUCCESS",
					"message": "Your feedback added Successfully.",
					"data": {
						"profileId": "64bba9cbdf47d8f4fdfa4869",
						"userId": "64bba86d14f51cec7118c74e",
						"mbti": "ESTJ",
						"enneagram": "9w8",
						"zodiac": "Taurus",
						"title": "Boss",
						"comment": "No 1",
						"isActive": true,
						"isDeleted": false,
						"createdAt": "2023-07-22T10:05:36.729Z",
						"updatedAt": "2023-07-22T10:05:36.729Z",
						"id": "64bba9f0df47d8f4fdfa4873"
					}
				}
```
```
3. Give reaction on comment or voting
   * request type: PUT
   * url: {{url}}/v1/profile/reaction/{{ProfileId}}/{{feedbackId}}
   * request headers: require Token ***Token Format***
   * request body:{
						"isLiked": true
					}
    * response :{
					"status": "SUCCESS",
					"message": "Your reaction updated Successfully.",
					"data": {
						"feedbackId": "64bba9d3df47d8f4fdfa486d",
						"isActive": true,
						"isDeleted": false,
						"profileId": "64bba8cd5e044954034ac69a",
						"userId": "64bba86d14f51cec7118c74e",
						"createdAt": "2023-07-22T10:52:11.797Z",
						"isLiked": true,
						"updatedAt": "2023-07-22T10:52:11.797Z",
						"id": "64bbb4db14f51cec7118ced1"
					}
				}
```
```
4. Get Profile Details
   * request type: POST
   * url: {{url}}/v1/profile/details/{{ProfileId}}
   * request headers: not required
   * request body:{
						"filter":{"mbti": "ESTJ"}, // for sorting based on type of mdti , ennenagram, zodiac
						"sortBy": "likes",  // value can be likes or createdAt for shorting based on best and recent
						"sortOrder": -1,
						"page": 1,
						"pageSize": 10
					}
    * response :{
					"status": "SUCCESS",
					"message": "Profile created successfully.",
					"data": [
						{
							"_id": "64bba9445e044954034ac6a4",
							"profileId": "64bba8cd5e044954034ac69a",
							"userId": "64bba88314f51cec7118c754",
							"mbti": "ESTJ",
							"enneagram": "9w8",
							"zodiac": "Taurus",
							"title": "Boss",
							"comment": "No 1",
							"createdAt": "2023-07-22T10:02:44.417Z",
							"likes": 0
						},
						{
							"_id": "64bba95f95aa19192caf2982",
							"profileId": "64bba8cd5e044954034ac69a",
							"userId": "64bba86d14f51cec7118c74e",
							"mbti": "ESTJ",
							"enneagram": "9w8",
							"zodiac": "Taurus",
							"title": "Boss",
							"comment": "No 1",
							"createdAt": "2023-07-22T10:03:11.758Z",
							"likes": 0
						},
						{
							"_id": "64bba9d3df47d8f4fdfa486d",
							"profileId": "64bba8cd5e044954034ac69a",
							"userId": "64bba86d14f51cec7118c74e",
							"mbti": "ESTJ",
							"enneagram": "9w8",
							"zodiac": "Taurus",
							"title": "Boss",
							"comment": "No 1",
							"createdAt": "2023-07-22T10:05:07.116Z",
							"likes": 1
						}
					]
				}
```
```
5. Get All Profile 
   * request type: POST
   * url: {{url}}/v1/profile/list
   * request headers: not required
   * request body:{
						"page": 1,
						"pageSize": 10
					}
    * response :{
					"status": "SUCCESS",
					"message": "Profile fetch successfully.",
					"data": {
						"data": [
							{
								"name": "Bapu",
								"description": "Bapu",
								"mbti": "ISFJ",
								"enneagram": "4w5",
								"variant": "sp/so",
								"tritype": "950",
								"socionics": "SEE",
								"sloan": "RCOEN",
								"psyche": "FEVL",
								"image": "https://soulverse.boo.world/images/1.png",
								"isActive": true,
								"isDeleted": false,
								"createdAt": "2023-07-22T13:19:44.793Z",
								"updatedAt": "2023-07-22T13:19:44.793Z",
								"id": "64bbd77077c4df56632d129d"
							}
							...
						],
						"paginator": {
							"itemCount": 1,
							"perPage": 10,
							"pageCount": 1,
							"currentPage": 1,
							"slNo": 1,
							"hasPrevPage": false,
							"hasNextPage": false,
							"prev": null,
							"next": null
						}
					}
				}
```
