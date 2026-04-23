# Expense Tracker App (Deploy Ready)

A basic real-life application built with Node.js + Express.

## What it does

- Add daily expenses
- List all saved expenses
- Delete expenses
- Get spending summary by category

## Local run

1. Install packages:

npm install

2. Run app:

npm start

3. Open:

http://localhost:3000

## API endpoints

- GET /health
- GET /api/expenses
- POST /api/expenses
- DELETE /api/expenses/:id
- GET /api/summary

## Deploy on AWS Elastic Beanstalk

1. Configure AWS + EB CLI
2. Run:

eb init
eb create
eb deploy
eb open

This project already includes Procfile and ebextensions for easy deployment.
