import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordlength: Yup.number()
    .min(4, 'Length Should be min 4 Character')
    .max(15, 'Length Should be max 15 Character')
    .required('Field Required')
})

const App = () => {

  const [password, setPassword] = useState('')
  const [isPasswordGenerate, setispassgenerate] = useState(false)
  const [lowercase, setlowercase] = useState(true)
  const [uppercase, setuppercase] = useState(false)
  const [numbers, setnumbers] = useState(false)
  const [symbol, setsymbols] = useState(false)

  const generatepasswordString = (passwordLength: number) => {
    let characterList = ''

    const upperCasechar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCasechar = 'abcdefghijklmnopqrstuvwxvz'
    const number = '0123456789';
    const specialCharacter = '!@#$%^&*_+()';

    if (uppercase) {
      characterList += upperCasechar
    }
    if (lowercase) {
      characterList += lowerCasechar
    }
    if (numbers) {
      characterList += number
    }
    if (symbol) {
      characterList += specialCharacter
    }

    const Password_Rusult = createPassword(characterList, passwordLength)
    setPassword(Password_Rusult)
    setispassgenerate(true)
  }

  const createPassword = (character: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const CharacterIndex = Math.round(Math.random() * character.length)
      result += character.charAt(CharacterIndex)
    }
    return result
  }

  const resetPassword = () => {
    setPassword('')
    setlowercase(true)
    setispassgenerate(false)
    setuppercase(false)
    setnumbers(false)
    setsymbols(false)
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <View style={styles.headView}>
            <Text style={styles.heading}>PassWord_Generater</Text>
          </View>
          <Formik
            initialValues={{ passwordlength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log('values :', values);
              generatepasswordString(Number(values.passwordlength))
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View>
                  <View style={styles.Input_View_for_all}>
                    <View>
                      <Text style={styles.Labale}>Password Length</Text>
                      {touched.passwordlength && errors.passwordlength && (
                        <Text
                          style={styles.errrmsg}
                        >{errors.passwordlength}</Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordlength}
                      onChangeText={handleChange('passwordlength')}
                      placeholder='Ex:8'
                      keyboardType='numeric'
                    />
                  </View>
                </View>
                <View style={styles.Input_View_for_all}>
                  <Text style={styles.Labale}>Include lowerCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowercase}
                    onPress={() => setlowercase(!lowercase)}
                    fillColor='red'
                  />
                </View>
                <View style={styles.Input_View_for_all}>
                  <Text style={styles.Labale}>Include uppercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    onPress={() => setuppercase(!uppercase)}
                    fillColor='pink'
                  />
                </View>
                <View style={styles.Input_View_for_all}>
                  <Text style={styles.Labale}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setnumbers(!numbers)}
                    fillColor='green'
                  />
                </View>
                <View style={styles.Input_View_for_all}>
                  <Text style={styles.Labale}>Include Symbol</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbol}
                    onPress={() => setsymbols(!symbol)}
                    fillColor='blue'
                  />
                </View>

                <View style={styles.btns}>
                  <TouchableOpacity
                    style={styles.savebtn}
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                  >
                    <Text>Genearte</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resetbtn}
                    onPress={() => {
                      handleReset();
                      resetPassword()
                    }}
                  >
                    <Text style={styles.resetbtnText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          {isPasswordGenerate ? (
            <View style={styles.result}>
              <Text style={styles.Description}>Long press to Copy</Text>
              <Text style={styles.passResult} selectable={true}>{password}</Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: 'center',
    color: '#74B9FF'
  },
  headView: {
    padding: 20,
    backgroundColor: '#192A56'
  },
  Input_View_for_all: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignContent: 'center',
    padding: 10
  },
  Labale: {
    fontSize: 18,
    marginVertical: 15
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#26ae60',
  },
  errrmsg: {
    color: 'red'
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginBottom: 15,
    alignContent: 'center',
    padding: 10
  },
  savebtn: {
    backgroundColor: '#E74292',
    padding: 20,
    borderRadius: 10,
    width: 100
  },
  resetbtn: {
    backgroundColor: '#BB2CD9',
    padding: 20,
    borderRadius: 10,
    width: 100,
  },
  resetbtnText: {
    textAlign: 'center'
  },
  result: {
    backgroundColor: '#192A56',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  passResult: {
    fontSize: 40
  },
  Description: {
    fontSize: 17,
  }
})