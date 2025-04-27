import { useState, useEffect } from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment from 'moment'
import Date from './date'

interface CalendarProps {
  onSelectDate: (date: moment.Moment) => void;
  selected: moment.Moment | null;
}

const Calendar = ({ onSelectDate, selected }: CalendarProps) => {
  const [dates, setDates] = useState<moment.Moment[]>([])

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = []
    for (let i = -4; i < 4; i++) {
      const date = moment().add(i, 'days')
      _dates.push(date)
    }
    setDates(_dates)
  }

  useEffect(() => {
    getDates()
  }, [])
 
  return (
    <>
      <View className="w-full ">
        <View className="h-[100px]">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date.toDate()}
                onSelectDate={(dateString) => onSelectDate(moment(dateString))}
                selected={selected ? selected.format('YYYY-MM-DD') : ''}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default Calendar
