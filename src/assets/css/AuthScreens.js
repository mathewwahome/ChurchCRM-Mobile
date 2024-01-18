import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Landing Page styles
  landing_screen_container: {
    paddingVertical: 60,
  },
  img_view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginTop: 20,
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  verse_view: {
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  verse_text: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    marginBottom: 10,
    marginHorizontal: 10,
    color: '#0b0b0b',
    paddingLeft: 20,
    paddingRight: 20,
  },
  verse: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '900',
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    color: '#0b0b0b',
  },
  auth_btn: {
    alignItems: 'center',
    paddingTop: 40,
  },
  authentication_buttons: {
    paddingVertical: 10,
    backgroundColor: '#0A7E8B',
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  auth_btn_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  forgot_password: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
    color: '#0b0b0b',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  signin: {
    paddingVertical: 8,
    marginTop: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    borderColor: '#0A7E8B',
    borderWidth: 3,
  },

  // Login page styles
  login_form: {
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  login_text: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    fontWeight: '700',
    color: '#0A7E8B',
  },
  login_input: {
    height: 50,
    width: '100%',
    backgroundColor: '#0000000B',
    paddingLeft: 10,
    color: '#000',
    borderRadius: 5,
    borderWidth: 0,
    borderColor: 'transparent',
    marginBottom: 10,
    marginTop: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },

  // Signup Page styles
  login_view: {
    display: 'flex',
    justifyContent: 'center',
  },
  account_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  account: {
    color: '#4C4C4C',
    fontWeight: '800',
    fontSize: 18,
  },
  login_link: {
    color: '#0A7E8B',
    fontWeight: '800',
    paddingTop: 1,
    fontSize: 17,
    paddingLeft: 1,
  },
  signup_img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
export {styles};
