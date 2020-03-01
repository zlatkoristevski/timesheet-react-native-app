import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import Config from '../config';

export default async function registerForPushNotificationsAsync(user_id, auth_token) {
  let expo_token = "test";


  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    // alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  expo_token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.

  const body = JSON.stringify({
    token: expo_token,
    user_id: user_id
  });

  const response = await fetch(Config.api_url+'/api/save-push-notifications-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+auth_token,
    },
    body: body
  });

  const resData = await response.json();

  return resData;

}