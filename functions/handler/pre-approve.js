

exports.approve = (req, res) =>{


    const user = {
        email: req.body.salary,
        password: req.body.employmentType
    };

     //  const myName: req.body



    return res.status(200).JSON({msg: user})
}