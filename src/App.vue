<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import createWrapper from './createWrapper.js';

	// web components
	import Avatar_ from '@ui5/webcomponents/dist/Avatar.js';
	import Input_ from '@ui5/webcomponents/dist/Input.js';
	import Bar_ from '@ui5/webcomponents/dist/Bar.js';
	import Button_ from '@ui5/webcomponents/dist/Button.js';
	import Dialog_ from '@ui5/webcomponents/dist/Dialog.js';
	import Title_ from '@ui5/webcomponents/dist/Title.js';
	import MessageStrip_ from '@ui5/webcomponents/dist/MessageStrip.js';

	// wrappers
	const Avatar = createWrapper(Avatar_);
	const Input = createWrapper(Input_);
	const Title = createWrapper(Title_);
	const MessageStrip = createWrapper(MessageStrip_);
	const Button = createWrapper(Button_);
	const Bar = createWrapper(Bar_);
	const Dialog = createWrapper(Dialog_);
	const DialogWithVModel = createWrapper(Dialog_, {
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
		inpValue.value = (event.target as HTMLInputElement).value;
	};
</script>
  
<template>
		<div class="container">
			<Bar>
				<template #startContent>
					<Button design="Emphasized">Start</Button>
				</template>
				<template #endContent>
					<Avatar initials="FX" size="XS" interactive/>
				</template>
				<MessageStrip>Bar Default Content</MessageStrip>
			</Bar>


			<br><br>
			<ui5-input :value="inpValue" @input="onInput" placeholder="Native web component input"></ui5-input> <!-- native web component -->
			<ui5-button design="Emphasized" @click="isDialogOpen1 = true">Native web component button</ui5-button> native web component
			<br><br>

			<Input v-model="inpValue" placeholder="Start typing..." /> <!-- two-way binding via v-model -->
			<Input :value="inpValue" @input="onInput" placeholder="Start typing..."/> <!-- one-way binding via value + input event -->

			<!-- One-way binding "open" prop + "close" event -->
			<Dialog ref="dialogRef" :open="isDialogOpen1" @close="isDialogOpen1 = false" headerText="Dialog Title">
				<MessageStrip @close="isDialogOpen1 = false">Dialog Content</MessageStrip>
				<template #footer>
					<Title>Dialog footer</Title>
				</template>
			</Dialog>
			
			<Button @click="isDialogOpen1 = true" design="Emphasized">Open Dialog 1</Button>


			<!-- Two-way binding via v-model on Dialog (v-model binds to "open" and listens for "close") -->
			<DialogWithVModel v-model="isDialogOpen2" headerText="Dialog Title">
				<MessageStrip @close="isDialogOpen2 = false">Dialog Content</MessageStrip>
				<template #footer>
					<Title>Dialog footer</Title>
				</template>
			</DialogWithVModel>

			<Button @click="isDialogOpen2 = true" design="Negative">Open Dialog 2</Button>

			<pre>Model : { value: {{ inpValue || `""`}}; isDialogOpen1: {{ isDialogOpen1 }};  isDialogOpen2: {{ isDialogOpen2 }};}</pre>
		</div>
</template>
