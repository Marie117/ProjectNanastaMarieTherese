import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import XDate from 'xdate'; 

class TimingScreen extends Component {
    state = {
         
        StartingDateTimeValue: null,
        ToDateValue: null,
        ToTimeValue: null,

        
        isStartingDateTimePickerVisible: false,
        isToDatePickerVisible: false,
        isToTimePickerVisible: false,

        dateOrTimeValue: null, 
        datePickerVisible: false, 
        timePickerVisible: false,
    };


    saveStartingDateTime = (value) => { 
        console.log("saveStartingDateTime - value:", value); 
        this.setState({
            StartingDateTimeValue: value,
        });
    }; 

    saveEndingDate = (value) => { 
        console.log("saveEndingDate - value:", value);
        this.setState({
            ToDateValue: value,
        });
    }; 

    saveEndingTime = (value) => {
        console.log("saveEndingTime - value:", value);
        this.setState({
            ToTimeValue: value,
        });
    };

    fRenderDateTimePicker = (dateTimePickerVisible, visibilityVariableName, dateTimePickerMode, defaultValue, saveValueFunctionName ) => {

        return (
            <View>
                
                {Platform.OS === 'ios' && dateTimePickerVisible &&
                    (<DateTimePicker
                        mode={dateTimePickerMode}
                        value={defaultValue}

                        onChange={ (event, value) => {
                            this.setState({
                                dateOrTimeValue: value,
                                 
                                [visibilityVariableName]: Platform.OS === 'ios' ? true : false,
                            });

                            if (event.type === "set") {
                                saveValueFunctionName(value);
                            }

                        }}
                    />)}
                {Platform.OS === 'android' && dateTimePickerVisible && this.state.datePickerVisible &&
                    (<DateTimePicker
                        mode={"date"}
                        display='default'
                        value={defaultValue}

                        onChange={ (event, value) => {
                            this.setState({
                                dateOrTimeValue: value,
                                datePickerVisible: false,
                            });

                            
                            if (event.type === "set" && dateTimePickerMode === "datetime") {
                                this.setState({
                                    timePickerVisible: true,
                                });
                            }
                            else if (event.type === "set" && dateTimePickerMode === "date") {
                                this.setState({ 
                                    [visibilityVariableName]: Platform.OS === 'ios' ? true : false, 
                                }); 

                                saveValueFunctionName(value);
                            }

                        }}
                    />)}

                {Platform.OS === 'android' && dateTimePickerVisible && this.state.timePickerVisible &&
                    (<DateTimePicker
                        mode={"time"}
                        display='spinner' 
                        is24Hour={false}  
                        value={defaultValue}

                        onChange={(event, value) => {
                            let newDateTime = value;
                            if (event.type === "set" && dateTimePickerMode === "datetime") {
                                newDateTime = this.state.dateOrTimeValue;
                                const newHours = value.getHours();
                                const newMinutes = value.getMinutes();
                                newDateTime.setHours(newHours);
                                newDateTime.setMinutes(newMinutes);
                                newDateTime.setSeconds(0);
                            }

                            this.setState({
                                dateOrTimeValue: newDateTime,
                                datePickerVisible: false,
                                timePickerVisible: false,

                                [visibilityVariableName]: Platform.OS === 'ios' ? true : false,
                            });

                            if (event.type === "set") {
                                saveValueFunctionName(newDateTime);
                            } 
                        }}

                    />)} 
            </View>
        );      
    }; 
    fFormatDateTime = (date1, format1 = "datetime") => {
        if (date1 === null) {
            return null;
        }
        const format2 = format1.toLowerCase();
        let dateFormatted;
        const date2 = new XDate(date1);

        switch (format2) {
            case "datetime": {
                dateFormatted = date2.toString('dd/MM/yyyy - hh:mm TT');
                return dateFormatted;
            }
            case "date": {
                dateFormatted = date2.toString('dd/MM/yyyy');
                return dateFormatted;
            }
            case "time": {
                dateFormatted = date2.toString('hh:mm TT');
                return dateFormatted;
            }
            default:
                return null;
        } 
    };

    fRenderDatePicker = (mode, visibilityVariableName) => {
        switch (mode) {
            case "datetime":
                return this.setState({ [visibilityVariableName]: true, datePickerVisible: true, timePickerVisible: false });
            case "date":
                return this.setState({ [visibilityVariableName]: true, datePickerVisible: true, timePickerVisible: false });
            case "time":
                return this.setState({ [visibilityVariableName]: true, datePickerVisible: false, timePickerVisible: true });
        } }

    render() {
        let defaultShiftStartDateTime = new Date();
        defaultShiftStartDateTime.setDate(defaultShiftStartDateTime.getDate() + 1);
        defaultShiftStartDateTime.setHours(9);
        defaultShiftStartDateTime.setMinutes(0);
        defaultShiftStartDateTime.setSeconds(0); 
        let defaultShiftEndDateTime = new Date();
        defaultShiftEndDateTime.setDate(defaultShiftEndDateTime.getDate() + 1);
        defaultShiftEndDateTime.setHours(17);
        defaultShiftEndDateTime.setMinutes(0);
        defaultShiftEndDateTime.setSeconds(0);

        return (
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            this.fRenderDatePicker("datetime", "isStartingDateTimePickerVisible");
                        }}>
                        <Input
                            label='Starting Date & Time'
                            placeholder={"01/01/2019 - 09:00 AM"}
                            editable={false}
                            value={this.fFormatDateTime(this.state.StartingDateTimeValue)}
                        />
                    </TouchableOpacity>

                    {
                    this.fRenderDateTimePicker(
                        this.state.isStartingDateTimePickerVisible,
                        "isStartingDateTimePickerVisible",

                        
                        "datetime",

                        defaultShiftStartDateTime, 
                        this.saveStartingDateTime,
                    )}


                    <TouchableOpacity
                        onPress={() => {
                            this.fRenderDatePicker("date", "isToDatePickerVisible");
                        }}>
                        <Input
                            label='Ending Date'
                            placeholder={"01/01/2019"}
                            editable={false}
                            value={this.fFormatDateTime(this.state.ToDateValue, "date")}
                        />
                    </TouchableOpacity>
                    {this.fRenderDateTimePicker(
                        this.state.isToDatePickerVisible,
                        "isToDatePickerVisible",
                        "date",
                        defaultShiftEndDateTime,

                        this.saveEndingDate,
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            // this.setState({ isToTimePickerVisible: true, });
                            this.fRenderDatePicker("time", "isToTimePickerVisible");
                        }}>
                        <Input
                            label='Ending Time'
                            placeholder={"09:00 AM"}
                            editable={false}
                            value={this.fFormatDateTime(this.state.ToTimeValue, "time")}
                        />
                    </TouchableOpacity>
                    {this.fRenderDateTimePicker(
                        this.state.isToTimePickerVisible,
                        "isToTimePickerVisible",
                        "time",
                        defaultShiftEndDateTime,
                        this.saveEndingTime,
                    )}
                </View>
        );
    }
}

export default TimingScreen;
