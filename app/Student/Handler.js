import Service from "./Service";

class StudentHandler {

    async addStudent(req, res) {
        try {
            const data = req.body
            const userId = req.user.userId
            const { studentName } = data
            if (!studentName) {
                return res.send({ response_code: 2, response_message: "student name is missing", response_code: 1 });
            } else {
                await Service.AddStudent(data, res, userId)
            }
        } catch (error) {
            console.error("ADD_STUDENT", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async getStudentList(req, res) {
        try {
            const data=req.query
            await Service.GetStudentList(data,res)
        } catch (error) {
            console.error("GET_STUDENT_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    async getSkillList(req, res) {
        try {
            const data = req.query
            await Service.GetSkillList(data, res)
        } catch (error) {
            console.error("GET_STUDENT_LIST", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    async getDashBoardDetails(req, res) {
        try {
            await Service.getDashboard(res)
        } catch (error) {
            console.error("DASHBOARD_DETAILS", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
    async updateStudent(req, res) {
        try {
            const data = req.body
                await Service.UpdateStudent(data, res)
        } catch (error) {
            console.error("UPDATE_STUDENT", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async deleteStudent(req, res) {
        try {
            const data = req.body
            await Service.DeleteStudent(data, res)
        } catch (error) {
            console.error("DELETE_STUDENT", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new StudentHandler();