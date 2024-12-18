---
title: Learn about the DB User role in mongoDB
slug: mongo/roles/db-user
parentDir: mongo/roles
author: Jake Laursen
order: 1
excerpt: read and readWrite
tags: ['mongodb', 'roles']
---

# Database User Roles

[Mongo Docs](https://docs.mongodb.com/v5.0/reference/built-in-roles/)

## read

- read data on all "non-system" collections
- granted actions
  - changeStream
  - collStats
  - dbHash
  - dbStats
  - find
  - killCursors
  - listIndexes
  - listCollections

## readWrite

- all the privileges of _read_ (_above_)
- includes data modification rights
  - convertToCapped
  - createCollection
  - dropCollection
  - createIndex
  - dropIndex
  - insert
  - remove
  - renameCollectionSameDB
  - update
