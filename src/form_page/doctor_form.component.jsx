import React, { useState, useEffect, createRef } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import { DirectUpload } from "@rails/activestorage";

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
	CardContent,
	Avatar


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

const CreateMso = ({ redirect }) => {
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
			documents: [{ id_proof_id: "", documents: '' }],
			qualifications: [{ qualification_id: "", documents: '' }]
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

	const getCity = state_id => {
		console.log(state_id)
		try {
			axios.get(`http://35.154.188.137/api/v1/get_cities/${state_id}`).then(response => {
				setCities(response.data);
				console.log(response.data);
			});
		} catch (error) { }
	};
	const fileInput = React.useRef(null);
	const handleImage = e => {
		const [file] = e.target.files;
		// console.log(file)

		if (file) {
			const reader = new FileReader();
			const { current } = uploadedImage;
			current.file = file;
			reader.onload = e => {
				current.src = e.target.result;


			};
			reader.readAsDataURL(file);
		}
	};



	const promises = [];
	const handleDocumentUpload = (document) => {
		const DocumentFiles = [];
		for (let j = 0; j < document.length; j++) {
			var fileToQuali = document[j].documents[0];
			DocumentFiles.push(fileToQuali)
		}

		return new Promise((resolve, reject) => {
			for (let i = 0; i < DocumentFiles.length; i++) {
				promises.push(uploadFiles(DocumentFiles[i], document[i].id_proof_id));
			}
		});
	};
	const handleQualificationUpload = (document) => {
		const DocumentFiles = [];
		for (let j = 0; j < document.length; j++) {
			var fileTo = document[j].documents[0];
			DocumentFiles.push(fileTo)
		}
		console.log(DocumentFiles[0])
		if (DocumentFiles[0] !== undefined) {
			for (let i = 0; i < DocumentFiles.length; i++) {
				console.log(document[i].qualification_id)
				// var allowed_extensions = new Array("jpg","png","jpeg","pdf");
				promises.push(uploadQualification(DocumentFiles[i], document[i].qualification_id));
			}
		}
	};

	const handleImageUpload = (image) => {
		console.log(image.length)
		if (image.length !== 0) {
			promises.push(uploadFile(image[0]))
		}
	}

	const uploadFile = (file) => {

		return new Promise((resolve, reject) => {
			const URL =
				"http://form-rails-api.herokuapp.com/rails/active_storage/direct_uploads";
			const upload = new DirectUpload(file, URL);
			upload.create((error, blob) => {
				if (error) {
					reject(error);
				} else {
					const hiddenField = document.createElement("input");
					hiddenField.setAttribute("type", "hidden");
					hiddenField.setAttribute("value", blob.signed_id);
					hiddenField.id = `profile_pic`;
					document.querySelector("form").appendChild(hiddenField);
					resolve("Success");
				}
			});
		});
	};


	const uploadFiles = (file, id) => {

		return new Promise((resolve, reject) => {
			const URL =
				"http://form-rails-api.herokuapp.com/rails/active_storage/direct_uploads";
			const upload = new DirectUpload(file, URL, id);
			upload.create((error, blob) => {
				if (error) {
					reject(error);
				} else {
					const hiddenField = document.createElement("input");
					hiddenField.setAttribute("type", "hidden");
					hiddenField.setAttribute("value", blob.signed_id + '_' + id);
					// hiddenField.id = `document`;
					hiddenField.id = `${id}`;
					hiddenField.setAttribute("class", `document_proof`);
					document.querySelector("form").appendChild(hiddenField);
					resolve("Success");
				}
			});
		});
	};

	const uploadQualification = (file, id) => {
		return new Promise((resolve, reject) => {
			const URL =
				"http://form-rails-api.herokuapp.com/rails/active_storage/direct_uploads";
			const upload = new DirectUpload(file, URL, id);
			upload.create((error, blob) => {
				if (error) {
					reject(error);
				} else {
					const hiddenField = document.createElement("input");
					hiddenField.setAttribute("type", "hidden");
					hiddenField.setAttribute("value", blob.signed_id + '_' + id);
					hiddenField.id = `${id}`;
					hiddenField.setAttribute("class", `qualification_proof`);
					document.querySelector("form").appendChild(hiddenField);
					resolve("Success");
				}
			});
		});
	};

	const onSubmit = data => {
		handleImageUpload(imageUploader.current.files)
		handleDocumentUpload(data.documents)
		handleQualificationUpload(data.qualifications)

		Promise.all(promises)
			.then(() => {
				var idProofElements = document.getElementsByClassName(`document_proof`)
				var idProofFiles = []
				for (let i = 0; i < idProofElements.length; i++) {
					console.log(idProofElements[i].value)
					idProofFiles.push(idProofElements[i].value)
				}
				for (let i = 0; i < data.documents.length; i++) {
					var value = idProofFiles.filter(function (item) {
						item.split('').reverse().join('')
						return item.split('_').pop() == data.documents[i].id_proof_id
					})
					data.documents[i].documents = value[0].split('_').shift()

				}

				var qualificationElements = document.getElementsByClassName(`qualification_proof`)
				var qualificationFiles = []
				for (let i = 0; i < qualificationElements.length; i++) {
					qualificationFiles.push(qualificationElements[i].value)
				}
				if (data.qualifications[0].qualification_id) {
					for (let i = 0; i < data.qualifications.length; i++) {
						var value = qualificationFiles.filter(function (item) {
							// console.log(item.split('_').pop())
							// console.log(item.split('').reverse().join(''))
							// console.log(item.split('_').pop())
							item.split('').reverse().join('')
							return item.split('_').pop() == data.qualifications[i].qualification_id
						})
						data.qualifications[i].documents = value[0].split('_').shift()
					}
				} else {
					data.qualifications = ''
				}
				var formData = new FormData();

				formData.append('user[name]', data.name)
				formData.append('user[email]', data.email)
				formData.append('user[mobile]', data.mobile)
				formData.append('user[gender]', data.gender)
				formData.append('user[address]', data.address)
				formData.append('user[city_id]', '135')
				formData.append('user[state_id]', data.state_id)
				formData.append('user[dob]', data.dob)
				formData.append('user[pincode]', data.pincode)
				formData.append('user[password]', data.encrypted_password)
				formData.append('user[password_confirmation]', data.confirm_password)
				formData.append('user[default_language]', data.default_language)
				if (imageUploader.current.files.length !== 0) {
					formData.append('user[profile_photo]', document.getElementById(`profile_pic`).value)
				}

				formData.append('user[username]', data.username)
				formData.append('user[centre_id]', '2')
				formData.append('user[role]', 'mso_owner')

				data.documents.map(obj => {
					Object.keys(obj).forEach((key) => {
						formData.append(`user[user_id_proofs_attributes][${obj.id_proof_id}][${key}]`, obj[key]);
					});
				})

				if (data.qualifications) {
					data.qualifications.map(obj => {
						Object.keys(obj).forEach((key) => {
							formData.append(`user[user_qualifications_attributes][${obj.qualification_id}][${key}]`, obj[key]);
						});
					})
				}

				for (let pair of formData.entries()) {
					console.log(pair[0] + ': ' + pair[1]);
				}

				fetch("http://form-rails-api.herokuapp.com/users", {
					method: "POST",
					headers: {
					},
					body: formData,
				}).then(response =>
					response.ok ? console.log(response) : alert("Not created change accordingly")
				);
				console.log(data)
			}).catch(error => console.log(error));


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

	const CustomInputs = React.forwardRef((props, ref) => {
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

	return (
		<div className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)}>

				<Grid container spacing={2}>
					<Grid item xs={12} sm={7} md={7} >
						<Card style={{ marginTop: '24px' }}>
							<CardContent>
								<Grid container spacing={2}>
									<Avatar>

										<input
											type="file"
											accept="image/*"
											onChange={handleImage}
											// ref={register()}
											ref={imageUploader}
											style={{
												display: "none"
											}}
										/>
										<div
											style={{
												height: "132px",
												width: "147px",
												backgroundColor: '#489a9c'
											}}
											onClick={() => imageUploader.current.click()}
										>
											<img
												ref={uploadedImage}
												// src={uploadedImage}
												// alt="Select"
												style={{
													width: "100",
													height: "100%",
													position: "acsolute",
													cursor: 'pointer'
												}}
											/>
										</div>
									</Avatar>
									<Grid item xs={12} sm={12} md={12} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.name)}
											name="name"
											// rules={{ required: "MSO Name is required" }}
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
												// required: "Mobile Number is required",
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
												// required: "Email is required",
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
											// rules={{ required: "User Name is required" }}
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
											// rules={{ required: "DOB is required" }}
											filterDate={(date) => {
												return moment() > date;
											}}
											isClearable
											customInput={<CustomInputs />}
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
												// rules={{ required: "Default Language is required" }}
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
												// rules={{ required: "Gender is required" }}
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
											// rules={{ required: "Address is required" }}
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
											error={Boolean(errors.state_id)}
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
												// rules={{ required: "State is required" }}
												control={control}
												onChange={([selected]) => {
													getCity(selected.target.value);
													return selected;
												}}
												defaultValue=""
											/>
											<FormHelperText>
												{errors.state_id && errors.state_id.message}
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
												{errors.city_id && errors.city_id.message}
											</FormHelperText>
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={4} md={4} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.pincode)}
											name="pincode"
											rules={{
												// required: "Pincode is required",
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
									{/* <Grid item xs={12} sm={4} md={4} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.centre_title)}
											name="centre_title"
											// rules={{ required: "Centre Title is required" }}
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
											// rules={{ required: "Centre Address is required" }}
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
											// rules={{ required: "Fixed Payment is required" }}
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
											// rules={{ required: "Revenue Share Consult is required" }}
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
											// rules={{ required: "Store Code is required" }}
											control={control}
											defaultValue=""
											label="Store Code"
											type="text"
											helperText={errors.store_code && errors.store_code.message}
											fullWidth
										/>
									</Grid> */}
									<Grid item xs={12} sm={6} md={6} >
										<Controller
											as={<TextField />}
											error={Boolean(errors.encrypted_password)}
											name="encrypted_password"
											// rules={{ required: "Password is required" }}
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
												// required: "Confirm Password is required",
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
																name={`qualifications[${index}].qualification_id`}
																control={control}
																defaultValue=""

															/>
														</FormControl>
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
															type="file"
															accept="image/png, image/jpeg,application/pdf"
															ref={register()}
															multiple={true}
															name={`qualifications[${index}].documents`}
															id={index}


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
													qualificationsAppend({ qualification_id: "", documents: "" });
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
																name={`documents[${index}].id_proof_id`}
																control={control}
																defaultValue=""

															/>
														</FormControl>
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <input
															type="file"
															accept="image/png, image/jpeg,application/pdf"
															ref={register({ required: true })}
															// ref={fileInput}
															name={`documents[${index}].documents`}
														// onChange={handleDocumentUpload}

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
													documentsAppend({ id_proof_id: "", documents: "" });
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
	{ key: '1', value: "Aadhaar Card" },
	{ key: '2', value: "Driving License" },
	{ key: '3', value: "Bank Passbook" }
]

const certificates = [
	{ key: '1', value: "High School" },
	{ key: '2', value: "Intermediate" },
	{ key: '3', value: "Diploma" },
	{ key: '4', value: "Post Graduate Diploma" },
	{ key: '5', value: "Graduation" },
	{ key: '6', value: "Post Graduation" }
]