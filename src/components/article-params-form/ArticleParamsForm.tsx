import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../../ui/text';
import { useState, useEffect, useRef } from 'react';
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const containerRef = useRef<HTMLElement | null>(null);

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

	// Закрывать панель при клике вне
	useEffect(() => {
		if (!isMenuOpen) return; // если меню закрыто, обработчик не нужен
		const handleOutside = (e: MouseEvent) => {
			const target = e.target as Node | null;
			if (
				containerRef.current &&
				target &&
				!containerRef.current.contains(target)
			) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleOutside);
		return () => {
			// очистка обработчика при размонтировании или закрытии меню
			document.removeEventListener('mousedown', handleOutside);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((prev) => !prev)}
			/>
			<aside
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
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
