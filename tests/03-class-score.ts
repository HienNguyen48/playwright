interface Student {
    id: number;
    name: string;
    age: number;
    score: number;
}

class Classroom {
    className: string;
    students: Student[] = [];

    constructor(className: string) {
        this.className = className;
    }

    addStudents(student: Student) {
        this.students.push(student);
    }

    listStudents() {
        for (let i = 0; i < this.students.length; i++) {
            console.log(`In ra từng học sinh: ${this.students[i].id}.${this.students[i].name} - ${this.students[i].age} - ${this.students[i].score}`);
        }
    }

    countStudents() {
        let countSLSV = this.students.reduce((b, c) => b + c.id, 0)
        return countSLSV;
    }

}

let classs = new Classroom("Lớp 11A");

classs.addStudents({ id: 1, name: "Nguyễn Ngọc Nại", age: 15, score: 6});
classs.addStudents({ id: 1, name: "Nguyễn Minh Anh", age: 15, score: 7});
classs.addStudents({ id: 1, name: "Lâm Hoàn", age: 16, score: 8});

console.log(classs.students);

console.log(classs.countStudents());
