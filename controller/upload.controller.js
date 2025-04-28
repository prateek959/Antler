const uploadCloud = async(req, res)=>{
  try {
    const baseurl = `${req.protocol}://${req.get('host')}/public/images`
    const url = `${baseurl}/${req.file.filename}`;
    res.status(201).json({url});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}


export { uploadCloud };