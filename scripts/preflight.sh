brew services start mongodb-community
echo 'mongo started'

# node scripts/seedReservationTable.js
# node scripts/seedWoofyBusTable.js



echo 'attempting to close ports'
# sudo lsof -P | grep ‘:8888’ | awk '{print $2}' | xargs kill -9
# sudo lsof -P | grep ‘:8887’ | awk '{print $2}' | xargs kill -9
sudo killall -9 node
echo 'ports test:'
sudo lsof -i tcp:3000 
sudo lsof -i tcp:3001 


 
# echo 'closing ports'
# # sudo lsof -P | grep ‘:8888’ | awk '{print $2}' | xargs kill -9
# # sudo lsof -P | grep ‘:8887’ | awk '{print $2}' | xargs kill -9
# sudo killall -9 node
# echo 'ports test:'
# sudo lsof -i tcp:3000 
# sudo lsof -i tcp:3001 


# # sudo fuser -k 9999/tcp
# brew services start mongodb-community
# echo 'mongo started'

