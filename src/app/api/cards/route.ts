import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

interface ClassData {
    nameClass: string;
    group: string;
    professorName: string;
    deadline: string;
    activityDetails: string;
}


export async function GET() {
    try {
        // Conexão com o banco de dados
        const connection = await mysql.createConnection("mysql://nextjs:nextjs@localhost:3306/classroom_copy");

        // Consultar as turmas e as imagens associadas
        const [turmas] = await connection.query(`
            SELECT t.*, 
                   i.imagem AS profileImage 
            FROM Turmas t
            LEFT JOIN imagens i ON t.imagem_id = i.id
        `);

        // Converter BLOB para base64
        const result = turmas.map(turma => ({
            ...turma,
            profileImage: turma.profileImage ? turma.profileImage.toString('base64') : null,
        }));

        await connection.end();

        // Retornar as turmas com as imagens
        return NextResponse.json(result);
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function POST(request: Request) {
    const body:ClassData = await request.json()


    const requiredFields: (keyof ClassData)[] = ['nameClass', 'group', 'professorName'];
    for (const field of requiredFields) {
        if (!body[field]) {
            return NextResponse.json({ error: `${field} é obrigatório.`, created: false });
        }
    }

    let connection: mysql.Connection | null = null;

    try {
        connection = await mysql.createConnection("mysql://nextjs:nextjs@localhost:3306/classroom_copy")
        console.log("Conexão com o banco de dados estabelecida.");

        const [result] = await connection.query(
            "INSERT INTO turmas ( nameClass, grupo, professorName ) VALUES (?, ?, ?)", 
            [body.nameClass, body.group, body.professorName]
        );

        console.log("Dados inseridos com sucesso:", result);
        return NextResponse.json({ created: true });
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Erro desconhecido', created: false });
    } finally {
        if (connection) {
            await connection.end();
            console.log("Conexão com o banco de dados encerrada.");
        }
    }
}