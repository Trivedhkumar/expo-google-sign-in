import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import ProfilePage from './Profile';

WebBrowser.maybeCompleteAuthSession();


export default function App() {
const [userData,setUserData] = React.useState(null);
  const [token,setToken] = React.useState<string | undefined | null>(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '<YOUR GENERATED ID>',
    iosClientId: '<YOUR GENERATED ID>',
    androidClientId: '<YOUR GENERATED ID>',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setToken(authentication?.accessToken)
    }
  }, [response]);
  const getUserInfo = async()=>{
    const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?access_token="+token);
    const response = await res.json();
    setUserData(response)
    return response;
  }
console.log(userData);

  return (
   <SafeAreaView style={styles.container}>
    {
      userData ? (
        <ProfilePage userData={userData} />
      )
      :(
<Button
      disabled={!request}
      title={token? "Get User Data":"Login"}
      onPress={() => token ? getUserInfo(): promptAsync()}
    />
      )
    }
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})