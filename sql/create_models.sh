#!/bin/bash

filepath=$(cd "$(dirname "$0")"; pwd)

rm -rf $filepath/models

sequelize-auto -o $filepath/models -d admin_auth -h localhost -u root -p 3306 -x Start2015 -e mysql -a $filepath/additional.json -t user_access_log