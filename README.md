# Petshop REST API

This is a simple REST API to manage a petshop coded in javascript (uses NodeJS and Express + MySQL) for studying purposes.

## Run the app

    node ./api/index.js

# REST API

The REST API is described below. Some examples were added to the database.

## Suppliers

### Get list of Suppliers

#### Request

`GET api/suppliers/`

    curl -i -H "Accept:application/json" -H "http://localhost:3000/api/suppliers/"

#### Response
  
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    Content-Length: 234
    ETag: W/"ea-MM3mwY1usnrlaS3yROn10v96aUI"
    Date: Tue, 30 Mar 2021 15:46:41 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    [{"id":1,"category":"food","company":"JS food for cats"},{"id":4,"category":"toys","company":"JS toys for cats"},{"id":5,"category":"toys","company":"JS toys for dogs"},{"id":6,"category":"toys","company":"Maximillian FOOD for Cats"}]

### Create a new Supplier

#### Request

`POST api/suppliers/`

    curl -i --location --request POST "http://localhost:3000/api/suppliers" --header "Content-Type:application/json" --header "Accept:application/json" --data-raw "{\"company\":\"Maximum Toys LTDA\",\"category\":\"toys\",\"email\":\"contato@maximum.com\"}"

#### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    Content-Length: 56
    ETag: W/"38-wcQm4JEEhqK7YKHmOvs+6TOwAeQ"
    Date: Tue, 30 Mar 2021 16:26:32 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":8,"category":"toys","company":"Maximum Toys LTDA"}

### Get a specific Supplier

#### Request

`GET /suppliers/id`

    curl -i --location --request GET "http://localhost:3000/api/suppliers/1" --header "Content-Type:application/json" --header "Accept:application/json"

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    Content-Length: 174
    ETag: W/"ae-d77IPbRqXGfnT0HjzNv09KotuX0"
    Date: Tue, 30 Mar 2021 16:30:15 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":"1","category":"food","email":"sales@js.petshop","company":"JS food for cats","createdAt":"2021-03-17T23:43:45.000Z","updatedAt":"2021-03-17T23:43:45.000Z","version":0}

### Get a non-existent Supplier

#### Request

`GET /suppliers/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/9999
    curl -i --location --request GET "http://localhost:3000/api/suppliers/9999" --header "Content-Type:application/json" --header "Accept:application/json"

#### Response

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    Content-Length: 48
    ETag: W/"30-lPobSTL/VdLin7S8GwDLt881ZaA"
    Date: Tue, 30 Mar 2021 16:32:28 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":0,"message":"[ERROR] Supplier not found!"}

### Change a Supplier ('s company name)

#### Request

`PUT /suppliers/:id`

    curl -i --location --request PUT "http://localhost:3000/api/suppliers/1" --header "Content-Type:application/json" --header "Accept:application/json" --data-raw "{\"company\":\"JS food for cats and dogs\"}"

#### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Content-Type: application/json
    Access-Control-Allow-Origin: *
    Date: Tue, 30 Mar 2021 16:41:51 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

### Attempt to change a Supplier using invalid params

#### Request

`PUT /suppliers/:id`

    curl -i --location --request PUT "http://localhost:3000/api/suppliers/1" --header "Content-Type:application/json" --header "Accept:application/json" --data-raw "{\"description\":\"Food for cats\"}"

#### Response

    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    Content-Length: 46
    ETag: W/"2e-Sf6IBlWHyK+8wXSZq2a86sFpjdY"
    Date: Tue, 30 Mar 2021 16:44:26 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":2,"message":"[ERROR] Data not provided"}

### Delete a Supplier

#### Request

`DELETE /suppliers/id`

    curl -i --location --request DELETE "http://localhost:3000/api/suppliers/8" --header "Content-Type:application/json"

#### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Content-Type: application/json
    Access-Control-Allow-Origin: *
    Date: Tue, 30 Mar 2021 16:46:37 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

### Try to delete same Supplier again

#### Request

`DELETE /suppliers/id`

    curl -i --location --request DELETE "http://localhost:3000/api/suppliers/8" --header "Content-Type:application/json"

#### Response

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    Content-Length: 48
    ETag: W/"30-lPobSTL/VdLin7S8GwDLt881ZaA"
    Date: Tue, 30 Mar 2021 16:47:03 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":0,"message":"[ERROR] Supplier not found!"}
    
## Products

### Get list of Products from an existent Supplier

#### Request

`GET /suppliers/id/products`

    curl -i --location --request GET "http://localhost:3000/api/suppliers/1/products" --header "Content-Type:application/json"

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    Content-Length: 2
    ETag: W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"
    Date: Tue, 30 Mar 2021 16:52:35 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    []
    
### Create a new Product for an existent Supplier

#### Request

`POST api/suppliers/id/products`

    curl -i --location --request POST "http://localhost:3000/api/suppliers/1/products" --header "Content-Type:application/json" --data-raw "{\"title\":\"snackos for cattos\",\"price\":20,\"inventory\":50}"

#### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    ETag: 0
    Last-Modified: 1617123579365
    Location: /api/suppliers/1/products/7
    Content-Length: 37
    Date: Tue, 30 Mar 2021 16:59:39 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
    
    {"id":7,"title":"snackos for cattos"}

### Delete a Product from an existent Supplier

#### Request

`DELETE api/suppliers/id/products/id`

    curl -i --location --request DELETE "http://localhost:3000/api/suppliers/6/products/6" --header "Content-Type:application/json"
    
#### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Content-Type: application/json
    Access-Control-Allow-Origin: *
    Date: Tue, 30 Mar 2021 17:05:38 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

### Change a Product ('s title) from an existent Supplier

#### Request

`DELETE api/suppliers/id/products/id`

    curl -i --location --request PUT "http://localhost:3000/api/suppliers/1/products/7" --header "Content-Type:application/json" --data-raw "{\"title\":\"snackos for doggos\"}"

#### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Content-Type: application/json
    Access-Control-Allow-Origin: *
    ETag: 0
    Last-Modified: 1617124248000
    Date: Tue, 30 Mar 2021 17:10:48 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

### Get a non-existent Product from an existent Supplier

#### Request

`GET api/suppliers/id/products/id`

    curl -i --location --request GET "http://localhost:3000/api/suppliers/1/products/999" --header "Content-Type:application/json"
    
#### Response

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    Content-Length: 47
    ETag: W/"2f-YkHRn5j8V3Cpa/29q1O/YjgBdxE"
    Date: Tue, 30 Mar 2021 17:11:55 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":0,"message":"[ERROR] Product not found!"}

### Get a specific Product from an existent Supplier

#### Request

`GET api/suppliers/id/products/id`

    curl -i --location --request GET "http://localhost:3000/api/suppliers/1/products/7" --header "Content-Type:application/json"
    
#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Access-Control-Allow-Origin: *
    ETag: 0
    Last-Modified: 1617124248000
    Content-Length: 173
    Date: Tue, 30 Mar 2021 17:16:10 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":"7","title":"snackos for doggos","price":19.99,"inventory":50,"supplier":"1","createdAt":"2021-03-30T17:02:52.000Z","updatedAt":"2021-03-30T17:10:48.000Z","version":0}
