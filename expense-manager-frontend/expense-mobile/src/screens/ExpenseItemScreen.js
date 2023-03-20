import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

import Container from '../components/Container';
import Button from '../components/Button';
import { theme } from '../common/theme';

const ExpenseItemScreen = ({ route, navigation }) => {
  const isAddMode = route.params?.itemIdx === undefined;

  const { control, handleSubmit, setValue, formState: {errors} } = useForm();

  const onSubmit = (data) => {
    navigation.navigate({
      name: 'Expense',
      params: {
        item: data,
        itemIdx: route.params?.itemIdx,
      },
      merge: true,
    });
  };

  const onDeletePressed = () => {
    navigation.navigate({
      name: 'Expense',
      params: {
        item: "delete",
        itemIdx: route.params?.itemIdx,
      },
      merge: true,
    });
  };

  return (
    <Container>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value}}) => (
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Name"
              returnKeyType="next"
              onChangeText={onChange}
              value={value}
              error={!!errors.name}
            />
            {errors.name &&
              <Text style={styles.error}>{errors.name.message}</Text>
            }
          </View>
        )}
        defaultValue={isAddMode ? '' : route.params.item['name']}
        rules={{
          required: {
            value: true,
            message: 'Name is required'
          }
        }}
      />

      <Controller
        control={control}
        name="amount"
        render={({field: {onChange, value}}) => (
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Amount"
              returnKeyType="done"
              keyboardType="number-pad"
              onChangeText={onChange}
              value={value}
              error={!!errors.amount}
            />
            {errors.amount &&
              <Text style={styles.error}>{errors.amount.message}</Text>
            }
          </View>
        )}
        defaultValue={isAddMode ? '' : String(route.params.item['amount'])}
        rules={{
          required: {
            value: true,
            message: 'Amount is required'
          }
        }}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        {isAddMode ? "Add" : "Save"}
      </Button>
      {!isAddMode &&
        <Button
          mode="contained"
          style={styles.button}
          onPress={onDeletePressed}
        >
          Delete
        </Button>
      }
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {navigation.goBack()}}
      >
        Cancel
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginVertical: 12,
  },
  button: {
    marginTop: 12,
  },
});

export default ExpenseItemScreen;
