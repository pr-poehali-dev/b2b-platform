import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const categories = [
  'Электроника', 'Текстиль', 'Продукты питания', 'Строительные материалы',
  'Автозапчасти', 'Медицинское оборудование', 'Мебель', 'Химическая продукция',
  'Упаковка', 'Металлопрокат', 'Пластик', 'Инструменты',
  'Бытовая техника', 'Косметика', 'Одежда', 'Обувь',
  'Игрушки', 'Спортивные товары', 'Канцелярия', 'Освещение'
];

const suppliers = [
  { id: 1, name: 'ТехноТрейд', category: 'Электроника', country: 'Китай', rating: 4.8, verified: true, minOrder: '10 000 ₽' },
  { id: 2, name: 'ТекстильПром', category: 'Текстиль', country: 'Турция', rating: 4.6, verified: true, minOrder: '50 000 ₽' },
  { id: 3, name: 'СтройМастер', category: 'Строительные материалы', country: 'Россия', rating: 4.9, verified: true, minOrder: '100 000 ₽' },
  { id: 4, name: 'АвтоПартс', category: 'Автозапчасти', country: 'Германия', rating: 4.7, verified: true, minOrder: '25 000 ₽' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [logisticsWeight, setLogisticsWeight] = useState('');
  const [logisticsDistance, setLogisticsDistance] = useState('');
  const [logisticsCost, setLogisticsCost] = useState<number | null>(null);
  
  const [currencyAmount, setCurrencyAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  
  const [docText, setDocText] = useState('');
  const [docLang, setDocLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  const calculateLogistics = () => {
    const weight = parseFloat(logisticsWeight);
    const distance = parseFloat(logisticsDistance);
    if (weight && distance) {
      const cost = (weight * 50) + (distance * 30) + 5000;
      setLogisticsCost(cost);
    }
  };

  const convertCurrency = () => {
    const amount = parseFloat(currencyAmount);
    const rates: Record<string, number> = {
      'RUB': 1,
      'USD': 0.011,
      'EUR': 0.010,
      'CNY': 0.078,
      'TRY': 0.35
    };
    if (amount && fromCurrency && toCurrency) {
      const result = amount * (rates[toCurrency] / rates[fromCurrency]);
      setConvertedAmount(result);
    }
  };

  const translateDoc = () => {
    const translations: Record<string, string> = {
      'en': 'Translated to English: ' + docText,
      'ru': 'Переведено на русский: ' + docText,
      'zh': '翻译成中文：' + docText,
      'tr': 'Türkçeye çevrildi: ' + docText
    };
    setTranslatedText(translations[docLang] || docText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Package" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">Поставщик.ру</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</Link>
            <Link to="/tenders" className="text-sm font-medium hover:text-primary transition-colors">Тендеры</Link>
            <a href="#tools" className="text-sm font-medium hover:text-primary transition-colors">Инструменты</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Вход</Button>
            <Button size="sm">Регистрация</Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
            Единая платформа<br />B2B-торговли
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            15 000+ проверенных поставщиков из 60+ стран. Безопасные сделки и экономия до 30%
          </p>
          <div className="flex gap-3 max-w-2xl mx-auto mt-8">
            <Input
              placeholder="Поиск товаров или поставщиков..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12"
            />
            <Button size="lg" className="h-12 px-8">
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon name="ShieldCheck" size={24} className="text-primary" />
              </div>
              <CardTitle>15 000+ поставщиков</CardTitle>
              <CardDescription>Все компании проверены и верифицированы</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon name="Globe" size={24} className="text-primary" />
              </div>
              <CardTitle>60+ стран</CardTitle>
              <CardDescription>Поставщики из СНГ, Азии, Европы и США</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon name="TrendingDown" size={24} className="text-primary" />
              </div>
              <CardTitle>Экономия до 30%</CardTitle>
              <CardDescription>Прямые контракты без посредников</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section id="catalog" className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold">Популярные поставщики</h3>
          <Link to="/catalog">
            <Button variant="outline">Смотреть все</Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suppliers.map(supplier => (
            <Card key={supplier.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  {supplier.verified && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Icon name="BadgeCheck" size={14} />
                    </Badge>
                  )}
                </div>
                <CardDescription>{supplier.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span>{supplier.country}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Star" size={16} className="text-yellow-500" />
                  <span className="font-medium">{supplier.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Package" size={16} className="text-muted-foreground" />
                  <span>Мин. заказ: {supplier.minOrder}</span>
                </div>
                <Button className="w-full mt-4" size="sm">Связаться</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="tools" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Инструменты для международной торговли</h3>
          <Tabs defaultValue="logistics" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="logistics">
                <Icon name="Truck" size={18} className="mr-2" />
                Логистика
              </TabsTrigger>
              <TabsTrigger value="currency">
                <Icon name="DollarSign" size={18} className="mr-2" />
                Валюта
              </TabsTrigger>
              <TabsTrigger value="translator">
                <Icon name="Languages" size={18} className="mr-2" />
                Переводчик
              </TabsTrigger>
            </TabsList>

            <TabsContent value="logistics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Калькулятор логистики</CardTitle>
                  <CardDescription>Рассчитайте стоимость доставки груза</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Вес груза (кг)</label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={logisticsWeight}
                      onChange={(e) => setLogisticsWeight(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Расстояние (км)</label>
                    <Input
                      type="number"
                      placeholder="5000"
                      value={logisticsDistance}
                      onChange={(e) => setLogisticsDistance(e.target.value)}
                    />
                  </div>
                  <Button onClick={calculateLogistics} className="w-full">
                    Рассчитать стоимость
                  </Button>
                  {logisticsCost !== null && (
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Ориентировочная стоимость доставки:</p>
                      <p className="text-2xl font-bold text-primary">
                        {logisticsCost.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="currency" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Конвертер валют</CardTitle>
                  <CardDescription>Переведите сумму в нужную валюту</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сумма</label>
                    <Input
                      type="number"
                      placeholder="100000"
                      value={currencyAmount}
                      onChange={(e) => setCurrencyAmount(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Из</label>
                      <Select value={fromCurrency} onValueChange={setFromCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RUB">RUB (₽)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="CNY">CNY (¥)</SelectItem>
                          <SelectItem value="TRY">TRY (₺)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">В</label>
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RUB">RUB (₽)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="CNY">CNY (¥)</SelectItem>
                          <SelectItem value="TRY">TRY (₺)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={convertCurrency} className="w-full">
                    Конвертировать
                  </Button>
                  {convertedAmount !== null && (
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Результат конвертации:</p>
                      <p className="text-2xl font-bold text-primary">
                        {convertedAmount.toFixed(2)} {toCurrency}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="translator" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Переводчик документов</CardTitle>
                  <CardDescription>Перевод текста контрактов и документов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Текст документа</label>
                    <textarea
                      className="w-full min-h-32 p-3 border rounded-md"
                      placeholder="Введите текст для перевода..."
                      value={docText}
                      onChange={(e) => setDocText(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Язык перевода</label>
                    <Select value={docLang} onValueChange={setDocLang}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">Английский</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="zh">Китайский</SelectItem>
                        <SelectItem value="tr">Турецкий</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={translateDoc} className="w-full">
                    Перевести
                  </Button>
                  {translatedText && (
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Результат перевода:</p>
                      <p className="text-sm">{translatedText}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-cyan-600 rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Готовы начать?</h3>
          <p className="text-xl mb-8 opacity-90">Зарегистрируйтесь и получите доступ к тысячам проверенных поставщиков</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Я покупатель
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
              Я поставщик
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Package" size={24} className="text-primary" />
                <h4 className="text-white font-bold">Поставщик.ру</h4>
              </div>
              <p className="text-sm">Единая платформа B2B-торговли для безопасных сделок с проверенными поставщиками</p>
            </div>
            <div>
              <h5 className="text-white font-medium mb-4">Платформа</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Каталог поставщиков</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Тендеры</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Международный раздел</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium mb-4">Поддержка</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">База знаний</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Чат 24/7</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Telegram-бот</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>8 (800) 555-35-35</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@postavshik.ru</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            © 2024 Поставщик.ру. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;