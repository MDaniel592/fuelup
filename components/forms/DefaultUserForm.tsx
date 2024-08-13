'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import * as React from 'react'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover'
import { cn } from 'lib/utils'
import { CalendarIcon } from 'lucide-react'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { format } from "date-fns"

const FormSchema = z.object({
  kilometers: z
    .coerce.number() 
    .min(1, {
      message: 'Kilometers must be at least 1 km.'
    })
    .max(2000, {
      message:
        'Kilometers must be at lower than 2000 km. What kind of motorcycle you have mate!'
    }),
  price: z
    .coerce.number() 
    .min(1, {
      message: 'Price must be at least 1 euro.'
    })
    .max(50, {
      message:
        'Price must be at lower than 50 euros. What kind of motorcycle you have mate!'
    }),
  liters: z
    .coerce.number() 
    .min(1, {
      message: 'Liters must be at least 1 euro.'
    })
    .max(50, {
      message:
        'Liters must be at lower than 50 euros. What kind of motorcycle you have mate!'
    }),
  dof: z.date({
    required_error: 'A date of fuel is required.'
  })
})

function DefaultUserForm({ onSave }) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const storedData = localStorage.getItem('userData');
    let jsonArray = storedData ? JSON.parse(storedData) : [];
    
    // Fix date to UTC
    values.dof = new Date(Date.UTC(values.dof.getFullYear(), values.dof.getMonth(), values.dof.getDate(), 12));
    jsonArray.push(values);

    localStorage.setItem('userData', JSON.stringify(jsonArray));
    onSave(); 
  }


  return (
    <Card>
    <CardHeader>
      <CardTitle>Registro de datos</CardTitle>
      <CardDescription>Introduce un nuevo repostaje</CardDescription>
    </CardHeader>
    <CardContent>    

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="kilometers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total kilometros</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormDescription>
                  Este es el total de kilometros recorridos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="liters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Litros repostados</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormDescription>
                  La cantidad de litros repostados.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coste repostaje</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormDescription>
                  Este es el precio del último repostaje.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dof"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of fuel up</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DayPicker
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // disabled={(date) =>
                      //   date > new Date() || date < new Date("1900-01-01")
                      // }
                      classNames={{ month_caption: "text-normal text-center" }} 
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of fuel up is used to generate an histogram.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      </CardContent>  
    </Card>
  )
}

export {DefaultUserForm};