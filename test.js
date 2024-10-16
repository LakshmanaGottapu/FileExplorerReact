const obj = {
    name: 'lakshman',
    age: 28,
    friends: [
        {
            name: 'prasanth',
            age:28,
            friends:[
                {
                    name: 'lokesh',
                    age: 28,
                    friends:[]
                },
                {
                    name:'diwakar',
                    age:28,
                    friends:[]
                }
            ]
        },
        {
            name: 'premchand',
            age: 28,
            friends:[
                {
                    name:'shankar',
                    age: 28,
                    friends:[]
                }
            ]
        }
    ]
}

console.log(obj.friends[0].name)
const obj1 = obj.friends[0];
obj1.name = 'harishankar'
console.log(obj.friends[0].name)