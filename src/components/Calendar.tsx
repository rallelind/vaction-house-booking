"use client"
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
    isAfter, 
    isBefore,
    isWithinInterval
} from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { useState } from 'react'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]

export default function Calendar() {
    let today = startOfToday()
    let [startDate, setStartDate] = useState(today)
    let [endDate, setEndDate] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  
    let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })
  
    function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function handleSelectedDay(day: any) {
        if(isEqual(day, startDate) || isEqual(day, endDate)) {
            setEndDate(day)
            setStartDate(day)
        }

        if(isAfter(day, startDate)) {
            setEndDate(day)
        } 

        if(isBefore(day, startDate)) {
            setStartDate(day)
        }

        
    }
  
    return (
      <div className="pt-20">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, 'MMMM yyyy')}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-md leading-6 text-center text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-md">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      'py-1.5'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectedDay(day)}
                      className={classNames(
                        isEqual(day, startDate) && isEqual(day, endDate) && 'bg-orange-200 text-white rounded-full',
                        isEqual(day, startDate) && !isEqual(day, endDate) && 'bg-orange-200 text-white rounded-full',
                        isEqual(day, endDate) && !isEqual(day, startDate) && 'bg-orange-200 text-white rounded-full',
                        isWithinInterval(day, { start: startDate, end: endDate }) && 'bg-orange-100',
                        !isWithinInterval(day, { start: startDate, end: endDate }) &&
                          !isEqual(day, startDate) &&
                          !isEqual(day, endDate) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          'text-gray-900',
                        !isWithinInterval(day, { start: startDate, end: endDate }) &&
                          !isEqual(day, startDate) &&
                          !isEqual(day, endDate) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          'text-gray-400',
                        isEqual(day, startDate) && isEqual(day, endDate) && !isToday(day) && 'bg-gray-900',
                        isEqual(day, startDate) && !isEqual(day, endDate) && 'rounded-l-full',
                        isEqual(day, endDate) && !isEqual(day, startDate) && 'rounded-r-full',
                        isEqual(day, startDate) && isEqual(day, endDate) && 'font-semibold',
                        'mx-auto flex h-8 w-8 items-center justify-center'
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    </button>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
} 