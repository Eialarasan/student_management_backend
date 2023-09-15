import { Op } from 'sequelize'
import Entity from '../../Entity/index'

class SkillService {
    async AddSkill(data, res, userId) {
        try {
            const { skillName } = data
            const checkSkill = await Entity.Skills.findOne({
                where: {
                    SkillName: skillName
                }
            })
            if (checkSkill) {
                return res.send({ status: "failed", message: "Skill already exists", response_code: 1 })
            } else {
                const payload = {
                    SkillName: skillName,
                }
                const saveSkill = await Entity.Skills.create(Object.assign({}, payload))
                return res.send({ status: "success", message: "Skill added successfully",response:saveSkill, response_code: 0 })
            }
        } catch (error) {
            console.error("ADD_SKILL", error)
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

   
    async UpdateSkill(data, res) {
        try {
            const { id, skillName } = data
            const findId = await Entity.Skills.findOne({
                where: {
                    id: id
                }
            })
            if (!findId) {
                res.send({ status: 'failed', message: "skill not found", response_code: 1 })
            } else {
                const payload = {
                    SkillName: skillName,
                }
                const updateSkill = await findId.update(Object.assign({}, payload))
                return res.send({ status: "success", message: "Skill updated successfully",response:updateSkill, response_code: 0 })
            }
        } catch (error) {
            console.error("UPDATE_SKILL", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async DeleteSkill(data, res) {
        try {
            const { id } = data
            const findId = await Entity.Skills.findOne({
                where: {
                    id: id
                }
            })
            
            if (!findId) {
                return res.send({ status: "failed", message: "Skill not found", response_code: 1 })
            } else {
                await findId.destroy()
                return res.send({ status: "success", response_code: 0, response_message: "Skill deleted successfully" })
            }
        } catch (error) {
            console.error("DELETE_STUDENT", error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new SkillService();