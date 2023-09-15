import { Op } from 'sequelize'
import Entity from '../../Entity/index'

class StudentService {
    async AddStudent(data, res, userId) {
        try {
            const { studentName, skillId, percentage } = data
            const checkstudent = await Entity.Student.findOne({
                where: {
                    studentName: studentName
                }
            })
            if (checkstudent) {
                return res.send({ status: "failed", message: "Student already exists", response_code: 1 })
            } else {
                const payload = {
                    studentName: studentName,
                    createdDate: new Date(),
                }
                const saveStudent = await Entity.Student.create(Object.assign({}, payload))
                const saveStudentSkill = await Entity.Studentskill.create({
                    studentId: saveStudent && saveStudent.id,
                    skillId: skillId,
                    percentage: percentage,
                    createdDate: new Date()
                })

                return res.send({ status: "success", message: "Student added successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("ADD_STUDENT", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async GetStudentList(data,res) {
        try {
            const studentList = await Entity.Student.findAll({
                where: data.search? {
                    isActive: 1,
                   studentName:{ [Op.like]: `%${data.search}%`}
                }:{
                        isActive: 1
                },
                include: [
                    {
                        model: Entity.Studentskill,
                        include: [{ model: Entity.Skills }]
                    },

                ]
            })
            return res.send({ status: 'success', message: 'success', response: studentList, response_code: 0 })
        } catch (error) {
            console.error("GET_STUDENT_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    async GetSkillList(data, res) {
        try {
            const skillList = await Entity.Skills.findAll({
                where: data.search ? {
                    SkillName: { [Op.like]: `%${data.search}%` }
                } : {
                    
                }
            })
            return res.send({ status: 'success', message: 'success', response: skillList, response_code: 0 })
        } catch (error) {
            console.error("GET_STUDENT_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
     count(skill,totalStudent){
        return skill.Studentskills.length/totalStudent*100
     }
    async getDashboard(res) {
        try {
            const totalStudent = await Entity.Student.findAll({})
            const Dashboard = await Entity.Skills.findAll({
                include: [
                    { model: Entity.Studentskill }
                ]
            })

            let result={}
             result["dashboardData"] = Dashboard.map((o) => {
                return {
                    skillName: o.SkillName,
                    // count: `${Math.round((o.Studentskills.length > 0 ? o.Studentskills.length : 0 / totalStudent.length)*10 )}%`
                    count:`${this.count(o,totalStudent.length)}%`
                }
            })
            result["totalStudents"]=totalStudent.length
            return res.send({ status: 'success', message: 'success', response: result, response_code: 0 })
        } catch (error) {
            console.error("GET_STUDENT_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    async UpdateStudent(data, res) {
        try {
            const { id, studentName, skillId, percentage, is_active } = data
            const findId = await Entity.Student.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                res.send({ status: 'failed', message: "student not found", response_code: 1 })
            } else {
                const payload = {
                    studentName: studentName,
                    updatedDate: new Date(),
                    isActive: is_active
                }

                const updateStudent = await findId.update(Object.assign({}, payload))

                const findStudSkill = await Entity.Studentskill.findOne({
                    where: {
                        studentId: updateStudent.id
                    }
                })
                const updateStudentSkill = await findStudSkill.update({
                    skillId: skillId,
                    percentage: percentage,
                    updatedDate: new Date(),
                })
                return res.send({ status: "success", message: "Student updated successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("UPDATE_STUDENT", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async DeleteStudent(data, res) {
        try {
            const { id } = data
            const findId = await Entity.Student.findOne({
                where: {
                    id: id
                }
            })
            const findStudentSkillId = await Entity.Studentskill.findOne({
                where: {
                    studentId: id
                }
            })

            if (!findId) {
                return res.send({ status: "failed", message: "Student not found", response_code: 1 })
            } else {
                await findId.destroy()
                await findStudentSkillId.destroy()
                return res.send({ status: "success",response_code:0, response_message: "Student deleted successfully" })
            }
        } catch (error) {
            console.error("DELETE_STUDENT", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new StudentService();