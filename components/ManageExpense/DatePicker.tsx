import { useState } from "react";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  setFieldValue: (fieldName: string, value: string) => void;
  setFieldTouched: (fieldName: string, bool: boolean) => void;
  value: string;
  style?: {};
};

const DatePicker = (props: Props) => {
  const resolveDefaultDate = () =>
    props.value === "" ? new Date() : new Date(props.value);
  const [date, setDate] = useState<Date | undefined>(resolveDefaultDate());
  const [show, setShow] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    console.log("Change ihgjhnlk", selectedDate);
    const currentDate = selectedDate;
    Platform.OS !== "android" && setShow(false);
    setDate(currentDate);
    props.setFieldValue(
      "date",
      getFormattedDate(selectedDate ? selectedDate : resolveDefaultDate())
    );
    props.setFieldTouched("date", true);
  };

  const showDatepicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date ? date : resolveDefaultDate(),
        onChange,
        mode: "date",
        is24Hour: true,
      });
    } else {
      setShow(true);
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.label}>Date</Text>
      <View style={styles.datePicker}>
        <Text style={styles.dateText}>
          {getFormattedDate(date ? date : resolveDefaultDate())}
        </Text>
        <View style={styles.buttonContainer}>
          <Button onPress={showDatepicker}>
            <Ionicons name="calendar" color="white" size={22} />
          </Button>
        </View>
        {Platform.OS !== "android" && show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date ? date : resolveDefaultDate()}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary100,
    paddingLeft: 6,
    borderRadius: 6,
    overflow: "hidden",
  },
  dateText: {
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
    marginBottom: 4,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
