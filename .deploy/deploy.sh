# скрипт для деплоя новой сборки на облачном сервере
# запускать надо в проекте на сервере
cd ~/production-project
npm run build:prod

rm -rf ~/../var/www/production_project/html
mv ~/production-project/build ~/../var/www/production_project/html