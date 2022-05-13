import '../main/config/module.alias'
import { Person } from '@/presentation/person'

const person = new Person()

console.log(person.speak('matheus'))
console.log(person.speak())
