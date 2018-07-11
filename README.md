# README

## members table

|Column|Type|Options|
|------|----|-------|
|user|reference|foreign_key: true|
|group|reference|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messages table

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group|reference|foreign_key: true|
|user|reference|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|

### Association
- has_many :members
- has_many :messages
- has_many :groups, through: :members

## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages

