// import React, { useState, createRef } from "react";
// import { useForm, Controller } from "react-hook-form";
// import axios from 'axios';

// import {
// Grid,
// Button,
// TextField
// } from "@material-ui/core";
// var sizeof = require('object-sizeof');
// const DoctorForm = ({ redirect }) => {
//   const { control, handleSubmit, errors, register,getValues, watch, setValue, reset } = useForm();
//   // const [doctor, setDoctor] = useState({
//   //   name: "",
//   //   dob: "",
//   //   fees: "",
//   // });
//   // const [revenueShareAttributes, setRevenueShareAttributes] = useState({
//   //   user_share: 0,
//   // });

//   // const handleDoctorChange = event => {
//   //   var identifier = event.target.name;
//   //   var value = event.target.value;
//   //   setDoctor({ ...doctor, [identifier]: value });
//   // };

//   // const handleRevenueShareAttributeChange = event => {
//   //   var identifier = event.target.name;
//   //   var value = event.target.value;
//   //   setRevenueShareAttributes({
//   //     ...revenueShareAttributes,
//   //     [identifier]: value,
//   //   });
//   // };

//   // const addDoctorToParams = formData => {
//   //   for (const key in doctor) {
//   //     formData.append(`doctor[${key}]`, doctor[key]);
//   //   }
//   // };

//   // const addRevenueShareAttributesToParams = formData => {
//   //   for (const key in revenueShareAttributes) {
//   //     formData.append(
//   //       `doctor[revenue_share_attributes][${key}]`,
//   //       revenueShareAttributes[key]
//   //     );
//   //   }
//   // };
// // const img = []
//   // const fileInput = createRef();
//   // const addDocumentsToParams = formData => {
//   //   for (let i = 0; i < fileInput.current.files.length; i++) {
//   //     console.log("doctor[documents][]", fileInput.current.files[i])
//   //    formData.append("doctor[documents][]", fileInput.current.files[i]);
//   //   }
//   // };

//   // const handleSubmit = event => {
//   //   event.preventDefault();
//   //   var formData = new FormData();
//   //   console.log(formData)
//   //   addDoctorToParams(formData);
//   //   addRevenueShareAttributesToParams(formData);
//   //   // able to do this because appending is independent
//   //   addDocumentsToParams(formData);
//   //   console.log(formData.get("doctor[documents][]"))
    
//   //   fetch("http://form-rails-api.herokuapp.com/doctors", {
//   //     method: "POST",
//   //     headers: {},
//   //     body: formData,
//   //   }).then(response =>
//   //     response.ok ? redirect() : alert("Not created change accordingly")
//   //   );
//   // };

//   const onSubmit = data => {

//   var formData = new FormData();
//   formData.append('doctor[name]',data.name)
//   formData.append('doctor[dob]',data.date)
//   formData.append('doctor[fees]',data.fees)
//   formData.append('doctor[revenue_share_attributes][user_share]',data.user_share)
//   formData.append('doctor[documents][]',data.file_uploads)
//   console.log(formData)
//     console.log(formData.get('doctor[documents][]'))
//   // console.log(data.file_uploads[0].name)
// // console.log(sizeof(formData))
//   // console.log(Buffer.from(formData).length )
  

//   // axios.post('http://form-rails-api.herokuapp.com/doctors',{body: formData},
  
//   // { headers: {} }).then(response => {
//   //     // setState(response.data);
//   //     // response.ok ? redirect() : alert("Not created change accordingly")
//   //     console.log(response.data)
    

//   // }).catch(error => {
//   //   if (error.response.data != "") {
//   //     alert(error.response.data.error);
//   //   } else {
//   //     alert(error.response.statusText);
//   //   }
//   // });
//   fetch("http://form-rails-api.herokuapp.com/doctors", {
//       method: "POST",
//       headers: {
//         // "Content-Type": "multipart/form-data"
//       },
//       body: formData,
//     }).then(response =>
//       response.ok ? redirect() : alert("Not created change accordingly")
//     );
//    console.log(data)
// 	};

//   return (
//     // To make this cleaner the form input and label fields can be moved to
//     // their own component and the state can be stored in a Redux Store to
//     // simplify the process of form submission
    
//     // <form onSubmit={handleSubmit}>
//     //   <label>Doctor Name:</label>
//     //   <input
//     //     name="name"
//     //     type="text"
//     //     value={doctor.name}
//     //     onChange={handleDoctorChange}
//     //   />
//     //   <label>Date of Birth</label>
//     //   <input
//     //     name="dob"
//     //     type="date"
//     //     value={doctor.dob}
//     //     onChange={handleDoctorChange}
//     //   />
//     //   <label>Fees</label>
//     //   <input
//     //     name="fees"
//     //     type="number"
//     //     value={doctor.fees}
//     //     onChange={handleDoctorChange}
//     //   />
//     //   <br />
//     //   <label>Revenue Share Details</label>
//     //   <input
//     //     name="user_share"
//     //     type="number"
//     //     value={revenueShareAttributes.user_share}
//     //     onChange={handleRevenueShareAttributeChange}
//     //   />
//     //   <br />
//     //   <label>Images & Documents</label>
//     //   <input id="file-uploads" type="file" multiple={true} ref={fileInput} />
//     //   <br />
//     //   <input type="submit" value="Submit" />
//     // </form>
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
// 			<Grid container spacing={2}>
// 				<Grid item xs={12} sm={9} md={9} >
// 					{/* <Card style={{ marginTop: '23px' }}> */}
			
// 						{/* <CardBody> */}
// 								<Grid container spacing={2}>
// 									<Grid item xs={12} sm={12} md={12} >
// 									<Controller
// 											as={<TextField />}
// 											name="name"
// 											control={control}
// 											defaultValue=""
// 											label="Full Name"
// 											type="text"
// 											fullWidth
// 											/>
// 									</Grid>
// 									<Grid item xs={12} sm={6} md={6} >
// 									<Controller
// 											as={<input />}
// 											name="date"
// 											control={control}
// 											// label="Full Name"
// 											type="date"
											
// 											/>
// 									</Grid>
// 									<Grid item xs={12} sm={6} md={6} >
// 									<Controller
// 										as={<TextField />}
// 										name="fees"
// 										control={control}
// 										defaultValue=""
// 										label="Fees"
// 										type="number"
// 										fullWidth
// 									/>
// 									</Grid>
//                   <Grid item xs={12} sm={6} md={6} >
// 									<Controller
// 										as={<TextField />}
// 										name="user_share"
// 										control={control}
// 										defaultValue=""
// 										label="Revenue Share Details"
// 										type="number"
// 										fullWidth
// 									/>
// 									</Grid>
//                   <Grid item xs={12} sm={6} md={6} >
//                   <input
//                   type="file"
//                   accept="image/png, image/jpeg,application/pdf"
//                   ref={register()}
//                   name='file_uploads'


//                 />
// 									</Grid>
// 								</Grid>
// 								{/* <CardFooter style={{ float: 'right' }}> */}
// 									<Button type="submit"  >Update</Button>
// 								{/* </CardFooter> */}
						
// 						{/* </CardBody> */}
// 					{/* </Card> */}
// 				</Grid>
// 			</Grid>
// 			</form>
//     </div>
//   );
// };

// export default DoctorForm;


import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { green } from '@material-ui/core/colors';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';

import { useForm, Controller, useFieldArray } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import {
	Select,
	FormControl,
	InputLabel,
	FormHelperText,
	Checkbox,
  FormControlLabel,
  Card,
  CardContent  


} from '@material-ui/core';

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: '17px'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "600",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none"
	},
	formControl: {

		minWidth: 150,
	},
	// files: {
	// 	marginRight: 52
	// },
	input: {
		display: 'block',
		boxSizing: 'border-box',
		width: '100%',
		borderRadius: '4px',
		border: '1px solid black',
		padding: '10px 15px',
		marginBottom: '2px',
		fontSize: '14px'
	}
});


const useStyles = makeStyles(styles);

const CreateMso = (props) => {
	const classes = useStyles();
	const [username, setUser] = useState();
	const [genders, setGender] = useState([]);
	const [defLanguage, setDefLanguage] = useState([]);
	const [states, setState] = useState([]);
	const [cities, setCities] = useState([]);
	const uploadedImage = React.useRef(null);
	const imageUploader = React.useRef(null);

	const { handleSubmit, errors, control, watch, getValues, register, setValue } = useForm({
		defaultValues: {
			documents: [{ document_id: "", document: '' }],
			qualifications: [{ document_id: "", Field: "", document: '' }]
		}
	});

	const {
		fields: documentsFields,
		append: documentsAppend,
		remove: documentsRemove
	} = useFieldArray({ control, name: "documents" });

	const {
		fields: qualificationsFields,
		append: qualificationsAppend,
		remove: qualificationsRemove
	} = useFieldArray({ control, name: "qualifications" });

	useEffect(() => {
		let mounted = true;

		const fetchStates = () => {
			axios.get('http://35.154.188.137/api/v1/get_states').then(response => {
				if (mounted) {
					setState(response.data);
				}

			}).catch(error => {
				if (error.response.data != "") {
					alert(error.response.data.error);
				} else {
					alert(error.response.statusText);
				}
			});
		};

		const fetchDefaultLanguage = () => {
			axios.get('http://35.154.188.137/api/v1/get_default_languages ').then(response => {
				if (mounted) {
					setDefLanguage(response.data);
				}

			}).catch(error => {
				if (error.response.data != "") {
					alert(error.response.data.error);
				} else {
					alert(error.response.statusText);
				}
			});
		};
		const fetchGender = () => {
			axios.get('http://35.154.188.137/api/v1/get_genders ').then(response => {
				if (mounted) {
					setGender(response.data);
				}

			}).catch(error => {
				if (error.response.data != "") {
					alert(error.response.data.error);
				} else {
					alert(error.response.statusText);
				}
			});
		};


		fetchStates();
		fetchGender()
		fetchDefaultLanguage();
		return () => {
			mounted = false;
		};
	}, []);

	const getCity = state_id => {
    console.log(state_id)
		try {
		  axios.get(`http://35.154.188.137/api/v1/get_cities/${state_id}`).then(response => {
			setCities(response.data);
			console.log(response.data);
		  });
		} catch (error) {}
		};
		
	const onSubmit = data => {

		for (let i = 0; i < data.documents.length; i++) {

			var fileTo = data.documents[i].document[0];
				data.documents[i].document = fileTo

		}

		for (let i = 0; i < data.documents.length; i++) {

			var value = optionsdata.filter(function (item) {
				return item.key == data.documents[i].document_id
			})
			data.documents[i].field = value[0].value
		}

		console.log(data.qualifications[0].document[0])

		for (let j = 0; j < data.qualifications.length; j++) {

			var fileToQuali = data.qualifications[j].document[0];

		    data.qualifications[j].document = fileToQuali


		}

		for (let i = 0; i < data.qualifications.length; i++) {

			var value = certificates.filter(function (item) {
				return item.key == data.qualifications[i].document_id
			})
			data.qualifications[i].field = value[0].value
		}

		var user = {
			name: data.name,
			email: data.email,
			mobile: data.mobile,
			gender: data.gender,
			address: data.address,
			city_id: data.city_id,
			state_id: data.state_id,
			// country_id: 99,
			pincode: data.pincode,
			password: data.encrypted_password,
			password_confirmation: data.confirm_password,
			default_language: data.default_language,
			store_code: data.store_code,
			profile_photo: data.file_uploads[0],
			username: data.username,
			centre: {
				centre_title: data.centre_title,
				centre_address: data.centre_address,
				type: "mso",
				fixed_payment: data.fixed_payment,
				revenue_share_consult: data.revenue_share_consult
			},
			qualifications: data.qualifications,
			documents: data.documents,
			role: 'mso_owner'
		};


		console.log(user);
	// 	if (localStorage.getItem("jwt") != '' || localStorage.getItem("jwt") !== undefined) {
	// 		let token = "Bearer " + localStorage.getItem("jwt");
	// 	axios.post('/users', { user: user },{ headers: { Authorization: token }}).then(response => {
	// 		console.log(response);
	// 		alert(response.data.message);
	// 		// props.history.goBack()
	// 	}).catch(error => {
	// 		if (error.response.data != "") {
	// 			alert(error.response.data.error);
	// 		} else {
	// 			alert(error.response.statusText);
	// 		}
	// 	});
	// }
}



	const Alpha = (event) => {
		var keynum
		if (window.event) {
			keynum = event.keyCode;
		} else if (event.which) {
			keynum = event.which;
		} else {
			keynum = 0;
		}

		if (keynum === 8 || keynum === 0 || keynum === 9) {
			return;
		}
		if (keynum < 46 || keynum > 57 || keynum === 47) {
			event.preventDefault();
		}
	}

	const handleImageUpload = e => {
		const [file] = e.target.files;
		console.log(file)
		if (file) {
			// const reader = new FileReader();
			const { current } = uploadedImage;
			current.file = file;
			current.src = e.target.result;
			// reader.onload = e => {
			// 	current.src = e.target.result;
			// };
			// reader.readAsDataURL(file);
		}
	};

	const CustomInput = React.forwardRef((props, ref) => {
		return (
			<input
				onClick={props.onClick}
				value={props.value}
				className={classes.input}
				type="text"
				placeholder="Select DOB"
				readOnly={true}
			/>
		)
	})


	const blockSpecialChar = (event) => {
		if (event.which === 13 || event.keyCode === 13) {
			return false;
		} else {
			var regex = new RegExp("^[.a-zA-Z0-9\b _ _%]+$");
			var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
			if (!regex.test(key)) {
				event.preventDefault();
				return false;
			}
		}
		return true;
	}

	return (
		<div className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)}>

				<Grid container spacing={2}>
					<Grid item xs={12} sm={7} md={7} >
						<Card style={{ marginTop: '24px' }}>
							<CardContent>
								<Grid container spacing={2}>
										<input
											type="file"
											accept="image/*"
											name='file_uploads'
											ref={register()}
											style={{
												// display: "none"
											}}
										/>
									<Grid item xs={12} sm={12} md={12} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.name)}
											name="name"
											rules={{ required: "MSO Name is required" }}
											control={control}
											defaultValue=""
											label="Full Name"
											type="text"
											helperText={errors.name && errors.name.message}
											fullWidth
											onKeyPress={blockSpecialChar}
											inputProps={{
												autoFocus: true
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={3} md={3} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.mobile)}
											name="mobile"
											rules={{
												required: "Mobile Number is required",
												pattern: {
													value: /^[0-9]*$/,
													message: "Only Numbers are allowed"
												},
												minLength: 10
											}}
											control={control}
											defaultValue=""
											label="Mobile"
											type="text"
											helperText={errors.mobile && errors.mobile.message}
											fullWidth
											onKeyDown={Alpha}
											inputProps={{
												maxLength: 10,
											}}
										/>

										{errors.mobile && errors.mobile.type === "minLength" &&
											<span style={{ color: 'red' }}>Number length should be 10</span>}
									</Grid>
									<Grid item xs={12} sm={5} md={5} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.email)}
											name="email"
											rules={{
												required: "Email is required",
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
													message: "Invalid email address"
												}
											}}
											control={control}
											// onChange={handleEmail}
											defaultValue=""
											label="Email"
											type="email"
											helperText={errors.email && errors.email.message}
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.username)}
											name='username'
											rules={{ required: "User Name is required" }}
											control={control}
											defaultValue=''
											label="User Name"
											type="text"
											helperText={errors.username && errors.username.message}
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<Controller
											as={<ReactDatePicker />}
											error={Boolean(errors.dob)}
											control={control}
											valueName="selected"
											onChange={([selected]) => selected}
											name="dob"
											rules={{ required: "DOB is required" }}
											filterDate={(date) => {
												return moment() > date;
											}}
											isClearable
											customInput={<CustomInput />}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dateFormat="yyyy/MM/dd "
											dropdownMode="select"
											popperPlacement="bottom-start"
										/>
										{errors.dob && <div style={{ color: 'red' }}>DOB is required</div>}
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<FormControl
											style={{ minWidth: 150 }}
											error={Boolean(errors.default_language)}
										>
											<InputLabel id="demo-simple-select-label">
												Default Language
											</InputLabel>

											<Controller
												as={
													<Select>
														{defLanguage.map(option => (
															<MenuItem key={option.value} value={option.key}>
																{option.value}
															</MenuItem>
														))}
													</Select>
												}
												name="default_language"
												rules={{ required: "Default Language is required" }}
												control={control}
												defaultValue=""
											/>
											<FormHelperText>
												{errors.default_language && errors.default_language.message}
											</FormHelperText>
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<FormControl
											style={{ minWidth: 150 }}
											error={Boolean(errors.gender)}
										>
											<InputLabel id="demo-simple-select-label">
												Gender
											</InputLabel>

											<Controller
												as={
													<Select>
														{genders.map(option => (
															<MenuItem key={option.value} value={option.key}>
																{option.value}
															</MenuItem>
														))}
													</Select>
												}
												name="gender"
												rules={{ required: "Gender is required" }}
												control={control}
												defaultValue=""
											/>
											<FormHelperText>
												{errors.gender && errors.gender.message}
											</FormHelperText>
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={12} md={12} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.address)}
											name="address"
											rules={{ required: "Address is required" }}
											control={control}
											defaultValue=""
											label="Address"
											type="text"
											helperText={errors.address && errors.address.message}
											fullWidth

										/>
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<FormControl
											style={{ minWidth: 170 }}
										// error={Boolean(errors.state_id)}
										>
											<InputLabel id="demo-simple-select-label">
												State
									        </InputLabel>

											<Controller
												as={
												<Select>
													{states.map(option => (
													<MenuItem key={option.id} value={option.id}>
														{option.state_name}
													</MenuItem>
													))}
												</Select>
												}
												name="state_id"
												rules={{ required: "State is required" }}
												control={control}
												onChange={([selected]) => {
												getCity(selected.target.value);
												return selected;
												}}
												defaultValue=""
											/>
											<FormHelperText>
												{/* {errors.state_id && errors.state_id.message} */}
											</FormHelperText>
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={4} md={4}>
									<FormControl
										style={{ minWidth: 170 }}
										error={Boolean(errors.city_id)}
									>
										<InputLabel id="demo-simple-select-label">
										City
										</InputLabel>
										<Controller
										as={
											<Select>
											{cities.map(option => (
												<MenuItem key={option.id} value={option.id}>
												{option.city_name}
												</MenuItem>
											))}
											</Select>
										}
										name="city_id"
										// rules={{ required: "City is required" }}
										control={control}
										defaultValue=""
										/>
										<FormHelperText>
										{/* {errors.city_id && errors.city_id.message} */}
										</FormHelperText>
									</FormControl>
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.pincode)}
											name="pincode"
											rules={{
												required: "Pincode is required",
												pattern: {
													value: /^[0-9]*$/,
													message: "Only Numbers are allowed"
												},
												minLength: 6
											}}
											control={control}
											defaultValue=""
											label="Pincode"
											type="text"
											helperText={errors.pincode && errors.pincode.message}
											fullWidth
											onKeyDown={Alpha}
											inputProps={{
												maxLength: 6,
											}}
										/>

										{errors.pincode && errors.pincode.type === "minLength" &&
											<span style={{ color: 'red' }}>Pincode length should be 6</span>}
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.centre_title)}
											name="centre_title"
											rules={{ required: "Centre Title is required" }}
											control={control}
											defaultValue=""
											label="Centre Title"
											type="text"
											helperText={errors.centre_title && errors.centre_title.message}
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} sm={8} md={8} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.centre_address)}
											name="centre_address"
											rules={{ required: "Centre Address is required" }}
											control={control}
											defaultValue=""
											label="Centre Address"
											type="text"
											helperText={errors.centre_address && errors.centre_address.message}
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.fixed_payment)}
											name="fixed_payment"
											rules={{ required: "Fixed Payment is required" }}
											control={control}
											defaultValue=""
											label="Fixed Payment"
											type="text"
											onKeyDown={Alpha}
											helperText={errors.fixed_payment && errors.fixed_payment.message}
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.revenue_share_consult)}
											name="revenue_share_consult"
											rules={{ required: "Revenue Share Consult is required" }}
											control={control}
											defaultValue=""
											label="Revenue Share Consult"
											placeholder="%"
											type="text"
											helperText={errors.revenue_share_consult && errors.revenue_share_consult.message}
											fullWidth
											inputProps={{ min: "0", max: "10" }}
										/>
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.store_code)}
											name="store_code"
											rules={{ required: "Store Code is required" }}
											control={control}
											defaultValue=""
											label="Store Code"
											type="text"
											helperText={errors.store_code && errors.store_code.message}
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} sm={6} md={6} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.encrypted_password)}
											name="encrypted_password"
											rules={{ required: "Password is required" }}
											control={control}
											defaultValue=""
											label="Password"
											type="password"
											helperText={errors.encrypted_password && errors.encrypted_password.message}
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} sm={6} md={6} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.confirm_password)}
											name="confirm_password"
											rules={{
												required: "Confirm Password is required",
												validate: value => {
													if (value === getValues()["encrypted_password"]) {
														return true;
													} else {
														return "Passwords do not match";
													}
												}
											}}
											control={control}
											defaultValue=""
											label="Confirm Password"
											type="password"
											helperText={errors.confirm_password && errors.confirm_password.message}
											fullWidth
										/>
									</Grid>
								</Grid>
									<Button color="primary" type="submit">Create</Button>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={5} md={5} >
						<Card style={{ marginTop: '24px' }}>
							<CardContent>
								<Grid container spacing={2}>
									<div>
										<Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
											<label style={{ fontSize: 17, fontWeight: 600 }}>Upload Documents :</label>
										</Grid>
									</div><br />
									<Grid item xs={12} sm={12} md={12} >
										<label style={{ fontSize: 15, fontWeight: 500 }}>*Select Education Certificates to Upload :</label>
									</Grid>
									<Grid item xs={12} sm={12} md={12} >

										<ul>
											{qualificationsFields.map((item, index) => {
												return (
													<li key={item.id}>

														<FormControl
															style={{ minWidth: 90, }}
														// error={Boolean(errors.state_id)}
														>
															<InputLabel id="demo-simple-select-label">
																Documents
											</InputLabel>

															<Controller
																as={
																	<Select>
																		{certificates.map(function (data, key) {
																			return (
																				<MenuItem key={key} value={data.key}>{data.value}</MenuItem>)
																		})}
																	</Select>
																}
																name={`qualifications[${index}].document_id`}
																control={control}
																defaultValue=""

															/>
														</FormControl>
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
															type="file"
															accept="image/png, image/jpeg,application/pdf"
															ref={register({ required: true })}
															name={`qualifications[${index}].document`}


														/>

														<HighlightOffIcon
															//   className={classes.icon}
															onClick={() => qualificationsRemove(index)}
														/>
													</li>
												);
											})}
										</ul>
										<section>
											<AddCircleIcon
												onClick={() => {
													qualificationsAppend({ document_id: "", document: "" });
												}}
											/>
										</section>

									</Grid>
									<Grid item xs={12} sm={12} md={12} >
										<label style={{ fontSize: 15, fontWeight: 500 }}>*Select ID'S to Upload :</label>
									</Grid>
									<Grid item xs={12} sm={12} md={12} >
										<ul>
											{documentsFields.map((item, index) => {
												return (
													<li key={item.id}>

														<FormControl
															style={{ minWidth: 90, }}
														>
															<InputLabel id="demo-simple-select-label">
																Documents
											</InputLabel>

															<Controller
																as={
																	<Select>
																		{optionsdata.map(function (data, key) {
																			return (
																				<MenuItem key={key} value={data.key}>{data.value}</MenuItem>)
																		})}
																	</Select>
																}
																name={`documents[${index}].document_id`}
																control={control}
																defaultValue=""

															/>
														</FormControl>
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
															type="file"
															accept="image/png, image/jpeg,application/pdf"
															ref={register({ required: true })}
															name={`documents[${index}].document`}

														/>

														<HighlightOffIcon
															//   className={classes.icon}
															onClick={() => documentsRemove(index)}
														/>
													</li>
												);
											})}
										</ul>
										<section>
											<AddCircleIcon
												onClick={() => {
													documentsAppend({ document_id: "", document: "" });
												}}
											/>
										</section>

									</Grid>

								</Grid>
							</CardContent>
						</Card>

					</Grid>
				</Grid>
			</form>
		</div>
	);
}

export default CreateMso;

const optionsdata = [
	{ key: '1', value: 'Aadhaar Card' },
	{ key: '2', value: 'Pan Card' },
	{ key: '3', value: 'Pass Book' }
]

const certificates = [
	{ key: '1', value: 'High School' },
	{ key: '2', value: 'Intermediate' },
	{ key: '3', value: 'Diploma' },
	{ key: '4', value: 'PGDM' },
	{ key: '5', value: 'Graduation' },
	{ key: '6', value: 'Post Graduation' }
]
