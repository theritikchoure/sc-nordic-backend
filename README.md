# SC-Nordic Backend Setup

This is a Node.js backend project using Express.js.


## Prerequisites
- Node.js (>=14 recommended)
- npm or yarn package manager
- MongoDB (or any other database you prefer)
- Postman or any API testing tool (optional)

## Getting Started
### 1. Clone the repository
```bash
git clone https://github.com/theritikchoure/sc-nordic-backend.git
cd sc-nordic-backend
```
### 2. Install dependencies
```bash
npm install
# or
yarn install
```
### 3. Setup environment variables
Create a `.env` file in the project root and add the following variables:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sc-nordic
JWT_SECRET=your_jwt_secret
```
### 4. Start the development server
```bash
npm run dev
# or
yarn dev
```
Your backend server will be running at `http://localhost:5000`.
### 5. Test the API
You can use Postman or any API testing tool to test the endpoints. You can find postman_collection.json in the root directory for a predefined set of API requests. 

## Additional Notes
After modifying the `.env` file, restart the dev server.
Make sure your MongoDB server is running and accessible at the URL set in `MONGODB_URI`.

