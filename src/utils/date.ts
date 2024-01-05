import {format, isToday, isTomorrow} from 'date-fns';
import {ptBR} from 'date-fns/locale';

const formatDate = (date?: string) => {
  if (!date) {
    return '--';
  }

  if (isToday(new Date(date))) {
    return format(new Date(date), "'Hoje', HH:mm", {locale: ptBR});
  } else if (isTomorrow(new Date(date))) {
    return format(new Date(date), "EEE', 'HH:mm", {locale: ptBR});
  } else {
    return format(new Date(date), 'dd.MM HH:mm', {locale: ptBR});
  }
};

export {formatDate};
