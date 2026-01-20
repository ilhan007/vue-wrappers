<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import Input_ from '@ui5/webcomponents/dist/Input.js';
	import Button_ from '@ui5/webcomponents/dist/Button.js';
	import Dialog_ from '@ui5/webcomponents/dist/Dialog.js';

	import createWrapper from './createWrapper';

	const Input = createWrapper(Input_);
	const Button = createWrapper(Button_);
	const Dialog = createWrapper(Dialog_, {
		modelProp: 'open',
		modelEvent: 'close'
	});

	const dialogRef = ref();
	const inpValue = ref('');
	const isDialogOpen1 = ref(false);
	const isDialogOpen2 = ref(false);

	onMounted(() => {
		console.log("dialogRef.value : ", dialogRef.value);
	});

	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		// if (target.value.length <=3) {
			inpValue.value = target.value;
			console.log('Input accepted:', target.value);
		// }
	};
</script>
  
<template>
		<div class="container">
			<Input v-model="inpValue"/>
			<Input :value="inpValue" @input="onInput" />

			<Dialog ref="dialogRef" :open="isDialogOpen1" @close="isDialogOpen1 = false">
				<template #default>
					<p>Dialog content</p>
				</template>
				<template #footer>
					<Button @click="isDialogOpen1 = false" asd="true" design="Emphasized">Close</Button>
				</template>
			</Dialog>
			
			<br><br>
			<Button @click="isDialogOpen1 = true" design="Emphasized">Open Dialog 1</Button>
			<br><br>

			<!-- v-model on Dialog (v-model binds to "open" and listens for "close") -->
			<Dialog v-model="isDialogOpen2">
				<template #default>
					<p>Dialog content</p>
				</template>
				<template #footer>
					<Button @click="isDialogOpen2 = false" design="Emphasized" >Close</Button>
				</template>
			</Dialog>

			<br></br>
			<Button @click="isDialogOpen2 = true" design="Emphasized">Open Dialog 2</Button>
			<br><br>
		</div>

		<br></br>

		<pre>
		Model 
			{ 
				value: {{ inpValue || `""`}}; 
				isDialogOpen1: {{ isDialogOpen1 }}; 
				isDialogOpen2: {{ isDialogOpen2 }};
			}
		</pre>
</template>
