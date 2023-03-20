import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {
	Appbar,
	Button,
	Card,
  FAB,
	Menu,
	Paragraph,
	Title,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../components/Container';
import Header from '../components/Header';
import {
  getAllExpense,
  submitExpense,
  clearState,
  expenseSelector
} from '../features/ExpenseSlice';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { expenses, isError, isFetching, isSuccess, errorMessage } = useSelector(expenseSelector);

	React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Appbar.Action
          icon="account"
          color="black"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
      ),
    });
  }, []);

  React.useEffect(() => {
    if (isError) {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  React.useEffect(() => {
    if (expenses.length == 0) {
        dispatch(getAllExpense());
    }
  }, []);

  ExpenseCards = (props) => {
    const expenses = props.expenses;
    const expenseCards = expenses.map((expense) =>
			<Card key={expense.id} style={styles.card}>
				<Card.Title
          title={expense.title}
          subtitle={"Created at " + expense.created_date}
        />
				<Card.Content>
          {!!expense.description &&
            <Paragraph>
              {expense.description}
            </Paragraph>
          }
					<Paragraph>{expense.status}</Paragraph>
					<Title>$ {parseFloat(expense.total).toFixed(2)}</Title>
				</Card.Content>
				<Card.Actions>
					<Button
            onPress={() => {
              navigation.navigate("Expense", {
                expenseId: expense.id,
              });
            }}
          >
          {expense.status === "Draft" ? "Edit" : "View"}
          </Button>
          {expense.status === "Draft" &&
            <Button
              onPress={() => {
                dispatch(submitExpense(expense.id));
              }}
            >
              Submit
            </Button>
          }
				</Card.Actions>
			</Card>
    );

    return (
      <>
        {expenseCards}
      </>
    )
  }

	return (
		<Container>
		<ScrollView
      style={{width: '100%'}}
      refreshControl={
				<RefreshControl
					refreshing={isFetching}
					onRefresh={() => {
            dispatch(getAllExpense());
          }}
        />
      }
    >
      <ExpenseCards expenses={expenses} />
		</ScrollView>
    <FAB
      style={styles.fab}
      icon="plus"
      onPress={() => {
        navigation.navigate("Expense");
      }}
    />
		</Container>
	);
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 12,
  },
  fab: {
    position: 'absolute',
    marginBottom: 32,
    right: 0,
    bottom: 0,
  },
});

export default DashboardScreen;
