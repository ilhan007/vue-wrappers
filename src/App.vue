<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import createWrapper from './createWrapper';

	// web components
	import Input_ from '@ui5/webcomponents/dist/Input.js';
	import Bar_ from '@ui5/webcomponents/dist/Bar.js';
	import Button_ from '@ui5/webcomponents/dist/Button.js';
	import Dialog_ from '@ui5/webcomponents/dist/Dialog.js';

	// wrappers
	const Input = createWrapper(Input_);
	const Button = createWrapper(Button_);
	const Bar = createWrapper(Bar_);
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

			<Bar>
				<template #startContent>
					<Button design="Emphasized">Start</Button>
				</template>
				<template #endContent>
					<Button design="Negative">End</Button>
				</template>
				<span>Bar Content</span>
			</Bar>

			<Dialog ref="dialogRef" :open="isDialogOpen1" @close="isDialogOpen1 = false">
				<template #>
					<p>Dialog content</p>
				</template>
				<template #footer>
					<Button @click="isDialogOpen1 = false" design="Emphasized">Close</Button>
				</template>
			</Dialog>
			
			<br><br>
			<Button @click="isDialogOpen1 = true" design="Emphasized">Open Dialog 1</Button>
			<br><br>

			<!-- v-model on Dialog (v-model binds to "open" and listens for "close") -->
			<Dialog v-model="isDialogOpen2">
				<template #>
					<p>Dialog content</p>
				</template>
				<template #footer>
					<Button @click="isDialogOpen2 = false" design="Emphasized">Close</Button>
				</template>
			</Dialog>

			<br></br>
			<Button @click="isDialogOpen2 = true" design="Negative">Open Dialog 2</Button>
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
