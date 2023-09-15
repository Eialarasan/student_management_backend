import Service from "./Service";

class SkillHandler {

    async addSkill(req, res) {
        try {
            const data = req.body
            const userId = req.user.userId
            const { skillName } = data
            if (!skillName) {
                return res.send({ response_code: 2, response_message: "skill name is missing", response_code: 1 });
            } else {
                await Service.AddSkill(data, res, userId)
            }
        } catch (error) {
            console.error("ADD_SKILL", error)
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
   
    async updateSkill(req, res) {
        try {
            const data = req.body
            await Service.UpdateSkill(data, res)
        } catch (error) {
            console.error("UPDATE_SKILL", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async deleteSkill(req, res) {
        try {
            const data = req.body
            await Service.DeleteSkill(data, res)
        } catch (error) {
            console.error("DELETE_SKILL", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new SkillHandler();