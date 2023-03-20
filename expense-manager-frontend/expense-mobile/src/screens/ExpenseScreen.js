import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native';
import {
  DataTable,
  TextInput,
  Title,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import DropDown from "react-native-paper-dropdown";

import Container from '../components/Container';
import Button from '../components/Button';
import { theme } from '../common/theme';
import {
  addExpense,
  saveExpense,
  getAllCategories,
  clearState,
  expenseSelector
} from '../features/ExpenseSlice';

const ExpenseScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { expenses, categories, isError, isSuccess, errorMessage } = useSelector(expenseSelector);

  const isAddMode = route.params?.expenseId === undefined;
  const [expense, setExpense] = useState({status: 'Draft'});
  const [expenseItems, setExpenseItems] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);

  const { control, handleSubmit, setValue, formState: {errors} } = useForm();

  const onSubmit = (data) => {
    data["items"] = expenseItems;
    data["receipt"] = receipt;
    if (isAddMode) {
      dispatch(addExpense(data));
    } else {
      dispatch(saveExpense(data));
    }
  };

  useEffect(() => {
    if (route.params?.item) {
      if (route.params.item === "delete") {
        setExpenseItems(expenseItems.filter(
          (ei, idx) => idx !== route.params.itemIdx
        ));
      } else if (route.params.itemIdx !== undefined) {
        let newExpenseItems = [...expenseItems];
        newExpenseItems[route.params.itemIdx] = {
          ...expenseItems[route.params.itemIdx],
          ...route.params.item,
        };
        setExpenseItems(newExpenseItems);
      } else {
        setExpenseItems([...expenseItems, route.params.item]);
      }
      navigation.setParams({
        item: null,
      });
    }
  }, [route.params?.item]);

  useEffect(() => {
    if (route.params?.receipt) {
      setReceipt(route.params.receipt);
      console.log(receipt);
    }
  }, [route.params?.receipt]);

  useEffect(() => {
    if (!isAddMode) {
      const expense = expenses.find((e) => e.id === route.params.expenseId);
      const fields = ["id", 'title', 'description', 'vendor', 'category_id', 'total'];
      fields.forEach(field => setValue(field, String(expense[field])));
      setExpense(expense);
      setExpenseItems(expense.items);
      setReceipt(expense.receipt);
    }
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (isError) {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      navigation.goBack();
    }
  }, [isError, isSuccess]);

  ExpenseItemTable = (props) => {
    const expenseItems = props.expenseItems;
    const expenseItemRows = expenseItems.map((ei, idx) =>
        <DataTable.Row
          key={idx}
          onPress={() => {
            navigation.navigate('Expense Item', {
              itemIdx: idx,
              item: { ...ei }
            });
          }}
        >
          <DataTable.Cell>{ei.name}</DataTable.Cell>
          <DataTable.Cell numeric>{parseFloat(ei.amount).toFixed(2)}</DataTable.Cell>
        </DataTable.Row>
    );

    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Cost</DataTable.Title>
        </DataTable.Header>
          {expenseItemRows}
      </DataTable>
    )
  }

  return (
    <ScrollView>
    <Container>
      <Controller
        control={control}
        name="title"
        render={({field: {onChange, value}}) => (
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Title"
              onChangeText={onChange}
              value={value}
              disabled={expense.status !== "Draft"}
              error={!!errors.title}
            />
            {errors.title &&
              <Text style={styles.error}>{errors.title.message}</Text>
            }
          </View>
        )}
        rules={{
          required: {
            value: true,
            message: 'Title is required'
          }
        }}
      />

      <Controller
        control={control}
        name="description"
        render={({field: {onChange, value}}) => (
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Description"
              onChangeText={onChange}
              value={value}
              disabled={expense.status !== "Draft"}
              error={!!errors.description}
            />
            {errors.description &&
              <Text style={styles.error}>{errors.description.message}</Text>
            }
          </View>
        )}
        rules={{
          required: {
            value: true,
            message: 'Description is required'
          }
        }}
      />

      <Controller
        control={control}
        name="vendor"
        render={({field: {onChange, value}}) => (
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Vendor"
              onChangeText={onChange}
              value={value}
              disabled={expense.status !== "Draft"}
              error={!!errors.vendor}
            />
            {errors.vendor &&
              <Text style={styles.error}>{errors.vendor.message}</Text>
            }
          </View>
        )}
        rules={{
          required: {
            value: true,
            message: 'Vendor is required'
          }
        }}
      />

      <Controller
        control={control}
        name="category_id"
        render={({field: {onChange, value}}) => (
          <View style={styles.input}>
						<DropDown
							label={"Category"}
							mode={"outlined"}
							visible={showDropDown}
							showDropDown={() => setShowDropDown(true)}
							onDismiss={() => setShowDropDown(false)}
							value={parseInt(value)}
							setValue={onChange}
							list={categories}
              inputProps={{
                error: !!errors.category_id,
                disabled: expense.status !== "Draft",
              }}
						/>
            {errors.category_id &&
              <Text style={styles.error}>{errors.category_id.message}</Text>
            }
          </View>
        )}
        rules={{
          required: {
            value: true,
            message: 'Category is required'
          }
        }}
      />

      <Controller
        control={control}
        name="total"
        render={({field: {onChange, value}}) => (
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              label="Total Amount"
              keyboardType="numeric"
              left= {
                <TextInput.Affix text="$" />
              }
              onChangeText={onChange}
              value={value}
              disabled={expense.status !== "Draft"}
              error={!!errors.total}
            />
            {errors.total &&
              <Text style={styles.error}>{errors.total.message}</Text>
            }
          </View>
        )}
        rules={{
          required: {
            value: true,
            message: 'Total is required'
          }
        }}
      />

      {expenseItems.length > 0 &&
        <View style={{
          marginTop: 24,
          width: '100%',
          alignItems: 'center',
        }}>
          <Title>Items</Title>
          <ExpenseItemTable expenseItems={expenseItems} />
        </View>
      }

      {receipt &&
        <View style={{
          marginVertical: 24,
          width: '100%',
          alignItems: 'center',
        }}>
          <Title>Receipt</Title>
          <Image
            style={{width: "100%", height: 320}}
            resizeMode="contain"
            source={{uri: 'data:image/jpeg;base64,' + receipt}}
          />
        </View>
      }

      {expense.status === "Draft" &&
        <View style={{
          marginBottom: 24,
          width: '100%',
          alignItems: 'center',
        }}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              navigation.navigate('Receipt');
            }}
          >
            {!!receipt ? "Change Receipt" : "Add Receipt"}
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              navigation.navigate('Expense Item');
            }}
          >
            Add Items
          </Button>
          <Button mode="contained"
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            {isAddMode ? "Add" : "Save"}
          </Button>
        </View>
      }
    </Container>
    </ScrollView>
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
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingTop: 4,
  },
});

export default ExpenseScreen;
