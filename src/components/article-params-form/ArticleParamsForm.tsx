import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../../ui/text';
import { useState } from 'react';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { RadioGroup } from '../../ui/radio-group';
import clsx from 'clsx';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

type Props = {
	articleState: ArticleStateType;
	onChange: (s: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, onChange }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	// локальная копия: изменения применяются в родителя только по submit
	const [localState, setLocalState] = useState<ArticleStateType>(articleState);

	const handleReset = (e?: React.FormEvent) => {
		e?.preventDefault();
		// сбрасываем состояние родителя и локальную копию
		onChange(defaultArticleState);
		setLocalState(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// применяем локальные изменения в родителя
		onChange(localState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite={false}>
						Задайте параметры
					</Text>
					<Select
						selected={localState.fontFamilyOption}
						onChange={(opt) =>
							setLocalState((s) => ({ ...s, fontFamilyOption: opt }))
						}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={localState.fontSizeOption}
						name='radio'
						onChange={(opt) =>
							setLocalState((s) => ({ ...s, fontSizeOption: opt }))
						}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={localState.fontColor}
						onChange={(opt) => setLocalState((s) => ({ ...s, fontColor: opt }))}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={localState.backgroundColor}
						onChange={(opt) =>
							setLocalState((s) => ({ ...s, backgroundColor: opt }))
						}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={localState.contentWidth}
						onChange={(opt) =>
							setLocalState((s) => ({ ...s, contentWidth: opt }))
						}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
